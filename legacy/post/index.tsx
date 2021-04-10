import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { K } from "../../constants";

interface PostData {
  date: string;
  title: string;
  body: string;
  genre: Genre[];
  media: string[];
}

interface NewPost {
  date: string;
  title: string;
  body: string;
  genre: Genre[];
  media: File[];
}

export enum Genre {
  Error,
  All,
  Code,
  Design,
  Robot,
  Others,
}

export class Post {
  date: string;
  title: string;
  body: string;
  genre: Genre[];
  media: string[];

  static Genre = Genre;
  static firestoreCache: firebase.firestore.DocumentData;
  static storageImageCache = new Map();

  static getPosts = (url?: string) => {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);
    if (!Post.firestoreCache) {
      Post.firestoreCache = firebase
        .firestore()
        .collection("posts")
        .get()
        .then((res) => {
          return Array.from(res.docs, (doc) => {
            return new Post(doc.data() as PostData);
          });
        });
    }

    return url
      ? Post.firestoreCache.then((value) =>
          value.find((el) => Post.parseToUrl(el.title) === url)
        )
      : Post.firestoreCache;
  };

  static parseToUrl(title: string): string {
    return title.toLowerCase().replace(/[^0-9a-zA-Z-_]/g, "-");
  }

  static genreToString(genre: Genre) {
    switch (genre) {
      case 0:
        return "ERROR";
      case 1:
        return "ALL";
      case 2:
        return "CODE";
      case 3:
        return "DESIGN";
      case 4:
        return "ROBOT";
      case 5:
        return "OTHERS";
      default:
        return "";
    }
  }

  static addNew = (data: NewPost) => {
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
      .set({
        date: data.date,
        title: data.title,
        body: data.body,
        genre: data.genre,
        media: data.media.map((value) => {
          return firebase
            .storage()
            .ref()
            .child("images")
            .child(url)
            .child(value.name).fullPath;
        }),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  static getStorage(ref: string) {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);

    if (!Post.storageImageCache.has(ref)) {
      Post.storageImageCache.set(
        ref,
        (async () => {
          return await firebase
            .storage()
            .ref()
            .child(ref)
            .getDownloadURL()
            .then((res) => {
              return res;
            })
            .catch((err) => {
              console.error("ERROR: ", err);
              return;
            });
        })()
      );
    }

    return Post.storageImageCache.get(ref);
  }

  constructor(data: PostData) {
    this.date = data.date;
    this.title = data.title;
    this.body = data.body;
    this.genre = data.genre;
    this.media = data.media;
  }
}
