import style from "./style.module.scss";
import Image from "next/legacy/image";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { databaseId } from "..";
import React from "react";
import { getWorkProperties } from "../../../data/works";

export default function WorkPage({ data }) {
  return (
    <div className={style.main}>
      <h3>
        {new Date(data?.props.date).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h3>
      <h1>{data?.props.fullName}</h1>
      <p>{data?.props.length}</p>
      <div className={style.imgBox}>
        <Image
          src={`/images/works/${data?.props.key}.jpg`}
          layout="fill"
          alt={data?.props.full_name}
          className={style.img}
        />
      </div>
      <h1>{data?.props.full_name}</h1>
      <div className={style.content}>
        {/* {data?.content.map((e) => resolveBlock(e))} */}
      </div>
    </div>
  );
}

const resolveBlock = (block) => {
  const jsx: any[] = [];

  switch (block.type) {
    case "paragraph":
      jsx.push(<p>{block.paragraph.text.reduce((a,c) => a+c.plain_text, "")}</p>);
  }

  if (block.has_children) {
  }
  return jsx;
};

export const getStaticPaths = async () => {
  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const entries = await notion.databases.query({
    database_id: databaseId,
  });

  return {
    paths: entries.results.map((entry) => ({
      params: {
        id:
          entry.properties["ID"]?.rich_text.reduce((a,c) => a+c.plain_text, "") ||
          entry.properties["Name"]?.title.reduce((a,c) => a+c.plain_text, "") ||
          entry["id"],
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const id = ctx.params?.["id"] as string;

  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const entriesWithKey = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: "ID",
          rich_text: {
            equals: id,
          },
        },
        {
          property: "Name",
          rich_text: {
            equals: id,
          },
        },
      ],
    },
  });
  if (entriesWithKey.results.length === 0) return { notFound: true };
  const entry = entriesWithKey.results[0];

  let start = true;
  let cursor = undefined;
  const blocks: any[] = [];

  while (cursor != undefined || start === true) {
    const blockWithKey = await notion.blocks.children.list({
      block_id: entry.id,
      start_cursor: cursor,
      // page_size: 5, // for testing TODO: testing
    });
    blocks.push(...blockWithKey.results);
    cursor = blockWithKey["next_cursor"];
    if (start == true) start = false;
  }

  const data = {
    props: getWorkProperties(entry),
    content: blocks,
  };

  return {
    revalidate: 10,
    props: { data },
  };
};
