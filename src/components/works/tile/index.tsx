import Link from "next/link";
import Image from "next/image";

import style from "./style.module.scss";
import ThemeBadge from "../../theme/badge";

export default function HomeTile({
  entryProps,
}) {
  console.log(entryProps);
  
  return (
    <div
      className={style.tile}
      style={{
        gridColumn: `span ${entryProps.notability === "High" ? 2 : 1}`,
      }}
    >
      <Link href={entryProps.url || `/works/${entryProps.id}`}>
        <a
          className={style.desc}
        >
          <h1>{entryProps.name}</h1>
          <p>{entryProps.discipline.map((e,i) => (
            <ThemeBadge key={i}>{e}</ThemeBadge>
          ))}</p>
          {/* <Image
            src={}
            layout="fill"
            alt={entryProps.properties.full_name}
            className={style.img}
          /> */}
          {/* <div className={style.overlay}>
            <div>
              
            </div>
          </div> */}
        </a>
      </Link>
      {entryProps.media[0]?.url && <Image src={entryProps.media[0].url} alt={entryProps.name} layout="fill" className={style.img}/>}
    </div>
  );
}
