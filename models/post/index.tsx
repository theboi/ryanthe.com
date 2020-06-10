import React from "react";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import K from "../../constants";

enum Genre {
  Code,
  Design,
  Robot,
}

export default class Post {
  title: string;
  body: string;
  genre: Genre | Genre[];
  media: File[];

  static Genre = Genre
  static cache: firebase.firestore.CollectionReference;

  static accessDb = () => {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);
    if (!Post.cache) Post.cache = firebase.firestore().collection("posts");
    return Post.cache;
  };

  static parseToUrl(title: string): string {
    return title.toLowerCase().replace(/[^0-9a-zA-Z-_]/g, "-");
  }

  static addNew = (data: Post) => {
    const url = Post.parseToUrl(data.title);
    data.media.map((value) => {
      firebase
        .storage()
        .ref()
        .child("images")
        .child(url)
        .child(value.name)
        .put(value)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });

    Post.accessDb()
      .doc(url)
      .withConverter({
        toFirestore: (post: Post) => {
          return {
            title: post.title,
            body: post.body,
            genre: post.genre,
            media: post.media.map((value) => {
              return firebase
                .storage()
                .ref()
                .child("images")
                .child(url)
                .child(value.name).fullPath;
            }),
          };
        },
        fromFirestore: (snapshot, options) => {
          const data = snapshot.data(options);
          return new Post(data.title, data.body, data.genre, data.media);
        },
      })
      .set(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  static getAll() {
    return Post.accessDb()
      .get()
      .then((res) => {
        return res.docs;
      });
  }

  static getWithUrl(url: string) {
    return Post.accessDb()
      .doc(url)
      .get()
      .then((res) => res.data());
  }

  constructor(
    title: string,
    body: string,
    genre: Genre | Genre[],
    media: File[]
  ) {
    // Post.accessDb()
    //   .get()
    //   .then((res) => {
    //     const post = res.docs.find((doc) => {
    //       doc.data().url ?? "" === url;
    //     }) ?? {
    //       data: () => {
    //         return {
    //           title: "ERROR",
    //           body: "ERROR",
    //           genre: "ERROR",
    //           media: "ERROR",
    //         };
    //       },
    //     };
    //   });

    this.title = title;
    this.body = body;
    this.genre = genre;
    this.media = media;
  }
}
