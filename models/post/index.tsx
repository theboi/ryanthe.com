import React from "react";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import K from "../../constants";

interface PostData {
  title: string;
  body: string;
  genre: Genre | Genre[];
  media: File[];
}

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

  static Genre = Genre;
  static cache: firebase.firestore.DocumentData;

  static getPosts = (url?: string) => {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);
    if (!Post.cache) {
      Post.cache = firebase
        .firestore()
        .collection("posts")
        .get()
        .then((res) => {
          return Array.from(res.docs, (doc) => {
            console.log(doc.data());
            return new Post(
              doc.data() as PostData
            );
          });
        });
    }
    return url
      ? Post.cache.then((value) => value.find((el) => el.title === url))
      : Post.cache;
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

    firebase
      .firestore()
      .collection("posts")
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
          return new Post({
            title: data.title,
            body: data.body,
            genre: data.genre,
            media: data.media,
          });
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

  constructor(data: PostData) {
    this.title = data.title;
    this.body = data.body;
    this.genre = data.genre;
    this.media = data.media;
  }
}
