// import React, { useEffect, useState } from "react";

// import style from "./style.module.css";
// import Post from "../../../models/work";

// export function PostCard(props: {
//   post: Post;
//   currentPosts: Post[];
//   isGrid: boolean;
// }) {
//   const [image, setImage] = useState<string | ArrayBuffer>(undefined);

//   useEffect(() => {
//     if (props.post?.media.length) {
//       Post.getStorage(props.post.media[0])
//         .then((res) => {
//           setImage(res);
//         })
//         .catch((err) => {
//           console.error("ERROR: ", err);
//         });
//     }
//   });

//   const LinkWrapper = ({ condition, wrapper, children }) =>
//     condition ? wrapper(children) : children;

//   return (
//     <LinkWrapper
//       condition={props.currentPosts.length}
//       wrapper={(children) => (
//         <Link
//           href="/works/[query]"
//           as={`/works/${Post.parseToUrl(props.post?.title ?? "ERROR")}`}
//         >
//           <a>{children}</a>
//         </Link>
//       )}
//     >
//       <div className={style.content}>
//         <div
//           className={`${style.post} ${props.isGrid ? style.grid : style.list} ${
//             !props.currentPosts.length ? style.loading : null
//           }`}
//         >
//           <div
//             className={style.image}
//             style={{ backgroundImage: `url(${image})` }}
//           />
//           <div className={style.details}>
//             <p>
//               {/* {(() => {
//                 return props.post?.genre
//                   .map((value) => Post.genreToString(value))
//                   .join(" | ");
//               })()} */}
//             </p>
//             <h2>{props.post?.title}</h2>
//             <p>{props.post?.body}</p>
//           </div>
//         </div>
//       </div>
//     </LinkWrapper>
//   );
// }

export function X() {
  return <div></div>
}