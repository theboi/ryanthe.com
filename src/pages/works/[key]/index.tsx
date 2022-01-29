import style from "./style.module.scss";
// import works from "../../../../public/data/works/works.json";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { databaseId } from "../";

export default function WorkPage({ data }) {

  return (
    <div className={style.main}>
      <h1>{data?.time}</h1>
      <h1>{data?.ccaRecord ? "Yes" : "No"}</h1>
      <h1>Hi</h1>
      <p>{data?.pageContent.length}</p>
      {data?.pageContent.map((e) => resolveBlock(e))}
      {/* <div className={style.imgBox}>
        <Image
          src={`/images/works/${data?.key}.jpg`}
          layout="fill"
          alt={data?.full_name}
          className={style.img}
        />
      </div>
      <h1>{data?.full_name}</h1>
      <ReactMarkdown className={style.md}>{data?.body}</ReactMarkdown> */}
    </div>
  );
}

const resolveBlock = (block) => {

}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const {
    params: { key },
  } = ctx;

  const { Client } = require("@notionhq/client");

  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const k = key as string;

  const entriesWithKey = (
    await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Key",
        rich_text: {
          equals: k,
        },
      },
    })
  );
  if (entriesWithKey.results.length === 0) return { notFound: true }
  const entryWithKey = entriesWithKey.results[0]
  // console.log(entryWithKey)
  // retrieve page
  // const blockWithKey = await notion.blocks.retrieve({ block_id: entryWithKey.id });

  // const blockWithKey = await notion.blocks.children.list({
  //   block_id: entryWithKey.id,
  //   page_size: 5,
  // });

  let start = true
  let cursor = undefined
  const blocks = []

  while (cursor != undefined || start === true) {
    const blockWithKey = await notion.blocks.children.list({
      block_id: entryWithKey.id,
      start_cursor: cursor,
      // page_size: 5, // for testing TODO: testing
    });
    blocks.push(...blockWithKey.results)
    cursor = blockWithKey["next_cursor"]
    if (start == true) start = false
  }

  const data = {
    time: entryWithKey["last_edited_time"],
    ccaRecord: entryWithKey.properties["CCA Record"].checkbox,
    pageContent: blocks,
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
    props: { data },
  };
}