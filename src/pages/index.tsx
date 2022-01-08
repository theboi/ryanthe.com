import style from "./style.module.scss";
import works from "../data/works/works.json"
import HomeTile from "../components/works/tile";

export default function HomePage() {
  return (
    <div className={style.main}>
      <section>
        <div className={style.grid}>
          {Object.values(works).map((e, i) => (
            <HomeTile key={i} data={e} />
          ))}
        </div>
      </section>
    </div>
  );
}
