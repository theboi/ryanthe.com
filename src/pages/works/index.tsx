import style from "./style.module.scss";
import HomeTile from "../../components/works/tile";
import { GetStaticPropsContext } from "next";
import { useEffect } from "react";

export const databaseId = "12c16582503441148d442bbab9528bdd";

export default function WorksPage({portfolio}) {
  useEffect(() => {
    console.log(portfolio);
    
  })
  return (
    <div className={style.main}>
      <section>
        <div className={style.grid}>
          {portfolio.results?.reverse().map((e,i) => (
            <HomeTile key={i} entry={e} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { Client } = require("@notionhq/client");

  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return {
    props: {
      portfolio: response
    },
  };
}
