import React, { ReactChildren, ReactNode } from "react";
import Link from "next/link";

import style from "./style.module.css";
import Post from "../../../models/post";

export default function PostCard(props: { value: Post; currentPosts: Post[]}) {
  const LinkWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <LinkWrapper
      condition={props.currentPosts.length}
      wrapper={(children) => (
        <Link
          href="/works/[query]"
          as={`/works/${props.value?.title
            ?.toLowerCase()
            .replace(/[^0-9a-zA-Z-_]/g, "-") ?? "ERROR"}`}
        >
          <a>{children}</a>
        </Link>
      )}
    >
      <div
        className={`${style.gridPost} ${
          !props.currentPosts.length ? style.loading : null
        }`}
      >
        {props.value?.media as string[]}
      </div>
    </LinkWrapper>
  );
}
