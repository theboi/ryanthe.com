import style from "./style.module.scss";
import Image from "next/image";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { databaseId } from "..";
import React from "react";

export default function WorkPage({ data }) {
  return (
    <div className={style.main}>
      <h3>
        {new Date(data?.time).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h3>
      <h1>{data?.fullName}</h1>
      <p>{data?.pageContent.length}</p>
      <div className={style.imgBox}>
        <Image
          src={`/images/works/${data?.key}.jpg`}
          layout="fill"
          alt={data?.full_name}
          className={style.img}
        />
      </div>
      <h1>{data?.full_name}</h1>
      <div className={style.pageContent}>
        {/* {data?.pageContent.map((e) => resolveBlock(e))} */}
      </div>
    </div>
  );
}

const resolveBlock = (block) => {
  const jsx = [];

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
  const id = ctx.params["id"] as string;

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
  const blocks = [];

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
    time: entry["last_edited_time"],
    name: entry.properties["Name"].title.reduce((a,c) => a+c.plain_text, ""),
    fullName: entry.properties["Full Name"].rich_text.reduce((a,c) => a+c.plain_text, ""),
    ccaRecord: entry.properties["CCA Record"].checkbox,
    pageContent: blocks,
    id:
      entry.properties["ID"]?.rich_text.reduce((a,c) => a+c.plain_text, "") ??
      entry.properties["Name"]?.title.reduce((a,c) => a+c.plain_text, ""),
    // writeUp
    // recognition
  };

  // 'CCA Record': { id: '%3Bu%60a', type: 'checkbox', checkbox: false },
  //   'Write-up': { id: '%3Con%5B', type: 'rich_text', rich_text: [] },
  //   Recognition: { id: '%3C%7DGl', type: 'rich_text', rich_text: [Array] },
  //   URL: { id: 'JpWR', type: 'url', url: null },
  //   'Full Name': { id: 'XKQA', type: 'rich_text', rich_text: [Array] },
  //   Media: { id: 'jl%3FA', type: 'files', files: [Array] },
  //   Date: { id: 'nSX%3F', type: 'date', date: null },
  //   Notability: { id: 'qacy', type: 'select', select: [Object] },
  //   New: { id: 't%5E%7B%3D', type: 'checkbox', checkbox: true },
  //   Key: { id: 'yhBt', type: 'rich_text', rich_text: [Array] },
  //   Discipline: { id: '%7DRzq', type: 'multi_select', multi_select: [Array] },
  //   Name: { id: 'title', type: 'title', title: [Array] }

  return {
    revalidate: 10,
    props: { data },
  };
};
