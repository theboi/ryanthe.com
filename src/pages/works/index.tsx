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
            <HomeTile key={i} data={e} /> // TODO: use "ID" as key
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
      name: e.properties["Name"].title.map((e) => e.plain_text).join(),
      discipline: e.properties["Discipline"].multi_select.map((e) => e.name).join(", "),
      notability: e.properties["Notability"]?.select?.name ?? "Low",
      id: e.properties["ID"]?.rich_text[0]?.plain_text ?? e.properties["Name"].title.map((e) => e.plain_text).join(),
    })),
  };

  return {
    props: {
      data,
    },
  };
}
