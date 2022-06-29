import style from "./style.module.scss";
import HomeTile from "../../components/works/tile";
import { GetStaticPropsContext } from "next";

export const databaseId = "12c16582503441148d442bbab9528bdd";

export default function WorksPage({ data }) {
  return (
    <div className={style.main}>
      <section>
        <div className={style.grid}>
          {data.entries?.map((e) => (
            <HomeTile key={e.id} data={e} />
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
  
  const data = {
    entries: entries.results.reverse().map((entry) => ({
      name: entry.properties["Name"].title.reduce(
        (a, c) => a + c.plain_text,
        ""
      ),
      url: entry.properties["URL"]?.url ?? "",
      discipline: entry.properties["Discipline"].multi_select
        .map((e) => e.name),
      notability: entry.properties["Notability"]?.select?.name ?? "Low",
      media: entry.properties["Media"]?.files,
      id:
        entry.properties["ID"]?.rich_text.reduce(
          (a, c) => a + c.plain_text,
          ""
        ) ||
        entry.properties["Name"]?.title.reduce(
          (a, c) => a + c.plain_text,
          ""
        ) ||
        entry["id"],
    })),
  };

  return {
    props: {
      data,
    },
  };
}
