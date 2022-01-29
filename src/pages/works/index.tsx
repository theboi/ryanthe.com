import style from "./style.module.scss";
import HomeTile from "../../components/works/tile";
import { GetStaticPropsContext } from "next";

export const databaseId = "12c16582503441148d442bbab9528bdd";

export default function WorksPage({ data }) {
  return (
    <div className={style.main}>
      <section>
        <div className={style.grid}>
          {data.entries?.map((e,i) => (
            <HomeTile key={i} data={e} /> // TODO: use "Key" as key
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

  const data = {
    entries: response.results.reverse().map((e) => ({
      name: e.properties["Name"],
      discipline: e.properties["Discipline"],
      notability: e.properties["Notability"],
      key: e.properties["Key"],
    })),
  };

  return {
    props: {
      data,
    },
  };
}
