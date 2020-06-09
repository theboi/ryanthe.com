import React from "react";

import * as firebase from "firebase/app";
import "firebase/firestore";

import K from "../../constants";

enum Genre {
  Code,
  Design,
  Robot,
}

export default class Post {
  static Genre = Genre;

  url: string;
  title: string;
  desc: string;
  genre: Genre | [Genre];
  media: string | [string];

  static getAll() {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);

    return firebase
    .firestore()
    .collection("posts")
    .get()
    .then((res) => {
      return res.docs
    });
  }

  constructor(url?: string) {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);
    this.url = url ?? "BLANK"

    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((res) => {
        const post = res.docs.find((doc) => {
          doc.data().url ?? "" === url;
        }) ?? {
          data: () => {
            return {
              title: "ERROR",
              desc: "ERROR",
              genre: "ERROR",
              media: "ERROR",
            };
          },
        };

        this.title = post.data().title;
        this.desc = post.data().desc;
        this.genre = post.data().genre;
        this.media = post.data().media;
      });
  }
}
