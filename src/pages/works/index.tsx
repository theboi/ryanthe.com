import style from "./style.module.scss";
import HomeTile from "../../components/works/tile";
import { GetStaticPropsContext } from "next";
import { getWorkProperties, WorksNotability } from "../../data/works";

export const databaseId = "12c16582503441148d442bbab9528bdd";

export default function WorksPage({ entries }) {
  return (
    <div className={style.main}>
      <section>
        <div className={style.grid}>
          {entries?.map((entry) => (
            <HomeTile key={entry.id} entryProps={entry} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { Client } = require("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const entries = await notion.databases.query({
    database_id: databaseId,
  });

  return {
    props: {
      entries: entries.results.reverse().map((e) => getWorkProperties(e)), // .filter((e) => e.notability != WorksNotability.Hidden)
    },
  };
}
