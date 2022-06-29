import Link from "next/link";
import Image from "next/image";

import style from "./style.module.scss";
import ThemeBadge from "../../theme/badge";

export default function HomeTile({
  data,
}) {  
  return (
    <div
      className={style.tile}
      style={{
        gridColumn: `span ${data.notability === "High" ? 2 : 1}`,
      }}
    >
      <Link href={data.url || `/works/${data.id}`}>
        <a
          className={style.desc}
        >
          <h1>{data.name}</h1>
          <p>{data.discipline.map((e,i) => (
            <ThemeBadge key={i}>{e}</ThemeBadge>
          ))}</p>
          {/* <Image
            src={}
            layout="fill"
            alt={data.properties.full_name}
            className={style.img}
          /> */}
          {/* <div className={style.overlay}>
            <div>
              
            </div>
          </div> */}
        </a>
      </Link>
      {data.media[0]?.file.url && <Image src={data.media[0]?.file.url} alt={data.name} layout="fill" className={style.img}/>}
    </div>
  );
}
