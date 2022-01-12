import Image from "next/image";
import style from "./style.module.scss";
import works from "../../../../public/data/works/works.json";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { GetStaticPropsContext } from "next";
import { databaseId } from "../..";

export default function WorkPage() {
  const router = useRouter();
  const {
    query: { key },
  } = router;
  const data = works[key as string] as typeof works[keyof typeof works];

  return (
    <div className={style.main}>
      <div className={style.imgBox}>
        <Image
          src={`/images/works/${data?.key}.jpg`}
          layout="fill"
          alt={data?.full_name}
          className={style.img}
        />
      </div>
      <h1>{data?.full_name}</h1>
      <ReactMarkdown className={style.md}>{data?.body}</ReactMarkdown>
    </div>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const {
    params: { key },
  } = ctx

  const { Client } = require("@notionhq/client");

  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const k = key as string

  // query database
  const queryResponse = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Key',
      rich_text: {
        equals: k
          },
    },
  });
  console.log(queryResponse);

  // retrieve page
  const retrieveResponse = await notion.pages.retrieve({ page_id: queryResponse.results[0].id });
  console.log(retrieveResponse);

  return {
    props: {}, // will be passed to the page component as props
  };
}
