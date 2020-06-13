import axios from "axios";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import K from "../../constants";

interface PostData {
  title: string;
  body: string;
  genre: Genre | Genre[];
  media: string[];
}

interface NewPost {
  title: string;
  body: string;
  genre: Genre | Genre[];
  media: File[];
}

enum Genre {
  Code = "CODE",
  Design = "DESIGN",
  Robot = "ROBOT",
}

export default class Post {
  title: string;
  body: string;
  genre: Genre | Genre[];
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
          value.find((el) => el.title === url)
        )
      : Post.firestoreCache;
  };

  static parseToUrl(title: string): string {
    return title.toLowerCase().replace(/[^0-9a-zA-Z-_]/g, "-");
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
      .set(data)
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
      console.log("getdownload");
      Post.storageImageCache.set(ref, (async () => {
        return await firebase
          .storage()
          .ref()
          .child(ref)
          .getDownloadURL()
          .then((res) => {
            return axios.get(res).then((res) => {
              return res;
            });
          })
      })())
    }
    return Post.storageImageCache.get(ref);
  }

  constructor(data: PostData) {
    this.title = data.title;
    this.body = data.body;
    this.genre = data.genre;
    this.media = data.media;
  }
}
