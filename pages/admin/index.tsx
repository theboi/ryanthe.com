import React, { useEffect, useRef } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

import style from "./style.module.css";
import K from "../../constants";

export default function AdminPage() {
  const message = "I see you have found me.".split("");

  let messageRef = useRef(null);
  let counter = 0;

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);

    messageRef.current.innerHTML = "";

    var typer = setInterval(() => {
      if (counter < message.length) {
        messageRef.current.innerHTML =
          messageRef.current.innerHTML + message[counter];
        counter++;
      }
    }, 50);
  });

  return (
    <>
      <div className={style.main}>
        <h1
        className={style.header}
          onDoubleClickCapture={() => {
            firebase
              .auth()
              .signInWithPopup(new firebase.auth.GoogleAuthProvider())
              .then((result) => {
                console.log("Successfully signed in");
                if (result.user.email === "ryan.the.2006@gmail.com") {
                } else firebase.auth().signOut();
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          Greetings, fellow human
        </h1>
        <p ref={messageRef}>{""}</p>
      </div>
    </>
  );
}
