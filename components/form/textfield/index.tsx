import React, { ChangeEvent, EventHandler, useRef, useState } from "react";
import style from "./style.module.css";

type TextFieldChangeEventHandler = (
  event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
) => void;

export enum TextFieldType {
  Single,
  Multi,
  Markdown,
}

export const TextField = (props: {
  placeholder: string;
  type?: TextFieldType;
  onChange: TextFieldChangeEventHandler;
}) => {
  switch (props.type ?? TextFieldType.Single) {
    case TextFieldType.Single:
      return (
        <input
          placeholder={props.placeholder}
          type="text"
          className={style.single}
          onChange={props.onChange}
        />
      );
    case TextFieldType.Multi:
      return (
        <textarea
          placeholder={props.placeholder}
          name="Content"
          id="content"
          cols={30}
          rows={10}
          className={style.multi}
          onChange={props.onChange}
        />
      );
    case TextFieldType.Markdown:
      const [content, setContent] = useState("i");

      const contentRef = useRef(null);

      const parseMdLine = (content: string) => {
        // switch true with breaks allows for conditional matching
        const pContent = content || "<br>"
        switch (true) {
          case /^#[^#].*$/gm.test(content):
            return `<h1>${pContent}</h1>`
          case /^##[^#].*$/gm.test(content):
            return `<h2>${pContent}</h2>`
          case /^###[^#].*$/gm.test(content):
            return `<h3>${pContent}</h3>`
          case /^####[^#].*$/gm.test(content):
            return `<h4>${pContent}</h4>`
          case /^#####[^#].*$/gm.test(content):
            return `<h5>${pContent}</h5>`
          case /^######[^#].*$/gm.test(content):
            return `<h6>${pContent}</h6>`
          default:
            return `<p>${pContent}</p>`
        }
      };

      return (
        <div
          className={style.markdown}
          contentEditable
          onBlur={() => {
            let newChildren = [];
            const children = contentRef.current.children;
            console.log(children);
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              console.log(child.textContent);
              newChildren.push(parseMdLine(child.textContent));
            }
            contentRef.current.innerHTML = newChildren.join("\n");
          }}
          ref={contentRef}
          suppressContentEditableWarning
        >
          <p>Body</p>
        </div>
      );
  }
};
