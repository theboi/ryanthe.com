// import React, { useEffect, useRef, useState, ChangeEvent } from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/storage";
// import style from "./style.module.css";
// import K from "../../../constants";
// import Post, { Genre } from "../../models/work";

// import { TextField, TextFieldType } from "../../components/form/textfield";
// import { Button } from "../../components/form/button"

// let titleField: string;
// let bodyField: string;
// let fileField: File[] = [];
// let dateField: string;
// let genreField: Genre[] = [];

// export function AdminPage() {
//   const [signedIn, setSignedIn] = useState(true);
//   const message = `I see you have found me. You shouldn't be here. Go away. 
                                                                              
//   Why are you still here...
                                                                            
//   Humans these days...
//   `.split("");

//   let messageRef = useRef(null);
//   let counter = 0;
//   let interval;

//   const validateInputs = () => {
//     if (!titleField || !bodyField || !dateField) {
//       alert("Fill in all fields");
//       return;
//     } else if (
//       !dateField.match(
//         /([0-9]{2,2})\/(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])/
//       )
//     ) {
//       alert("Invalid date");
//       return;
//     } else if (!fileField.length) {
//       alert("No files selected");
//     }
//     console.log("bef", genreField);
//     try {
//       Post.addNew({
//         date: dateField ?? "ERROR",
//         title: titleField ?? "ERROR",
//         body: bodyField ?? "ERROR",
//         genre: genreField ?? [Genre.Error],
//         media: fileField,
//       });
//       alert("Successfully posted");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const adminPage = (
//     <>
//       <div className={style.admin}>
//         <TextField
//           placeholder="Date"
//           onChange={(event) => {dateField = event.target.value}}
//         />
//         <TextField
//           placeholder="Title"
//           onChange={(event) => {titleField = event.target.value}}
//         />
//         <TextField
//           placeholder="Body"
//           onChange={(event) => {bodyField = event.target.value}}
//           type={TextFieldType.Markdown}
//         />
//         {/* <div className={style.genre}>
//           <input
//             type="checkbox"
//             id="code"
//             onChange={(event) => checkboxHandler(event, Genre.Code)}
//           />
//           <label htmlFor="code">Code</label>

//           <input
//             type="checkbox"
//             id="design"
//             onChange={(event) => checkboxHandler(event, Genre.Design)}
//           />
//           <label htmlFor="design">Design</label>

//           <input
//             type="checkbox"
//             id="robot"
//             onChange={(event) => checkboxHandler(event, Genre.Robot)}
//           />
//           <label htmlFor="robot">Robot</label>
//         </div> */}
//         <input
//           type="file"
//           id="file"
//           multiple
//           onChange={(event) => (fileField = Array.from(event.target.files))}
//         />
//         <Button onClick={validateInputs} />
//       </div>
//     </>
//   );

//   const loginPage = (
//     <>
//       <h1 className={style.header}>
//         Greetings, fellow hum
//         <span
//           onDoubleClick={() => {
//             firebase
//               .auth()
//               .signInWithPopup(new firebase.auth.GoogleAuthProvider())
//               .then((result) => {
//                 console.log("Successfully signed in");
//                 if (result.user.email === "ryan.the.2006@gmail.com") {
//                   setSignedIn(true);
//                 } else {
//                   firebase.auth().signOut();
//                   setSignedIn(false);
//                   clearInterval(interval);
//                 }
//               })
//               .catch((error) => {
//                 console.error(error);
//               });
//           }}
//         >
//           a
//         </span>
//         n
//       </h1>
//       <p ref={messageRef}>{""}</p>
//     </>
//   );

//   useEffect(() => {
//     if (!signedIn) {
//       if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);

//       // messageRef.current.innerHTML = "";
//       // clearInterval(interval)
//       // interval = setInterval(() => {
//       //   if (counter < message.length) {
//       //     messageRef.current.innerHTML =
//       //       messageRef.current.innerHTML + message[counter];
//       //     counter++;
//       //   }
//       // }, 50);
//     }
//   });

//   const checkboxHandler = (event, genre: Genre) => {
//     if (event.target.checked) genreField.push(genre);
//     else genreField.splice(genreField.indexOf(genre), 1);
//   };

//   return (
//     <>
//       <div className={style.main}>{signedIn ? adminPage : loginPage}</div>
//     </>
//   );
// }

export function AdminPage() {
  return <div></div>
}