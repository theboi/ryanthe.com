import Link from "next/link";
import Image from "next/image";

import style from "./style.module.scss";
import ThemeBadge from "../../theme/badge";
import { WorksDiscipline, WorksNotability, WorksProperties } from "../../../data/works";

export default function HomeTile({
  entryProps,
}: {
  entryProps: WorksProperties;
}) {
  return (
    <div
      className={style.tile}
      style={{
        gridColumn: `span ${entryProps.notability === WorksNotability.High ? 2 : 1}`,
        backgroundColor: !entryProps?.coverImageURL && "#f8f8f8"
      }}
    >
      <Link href={entryProps.url || `/works/${entryProps.id}`}>
        <a className={style.desc}>
          <h1>{entryProps.name}</h1>
          <p>
            {entryProps.discipline.map((e, i) => (
              <ThemeBadge key={i}>{WorksDiscipline[e]}</ThemeBadge>
            ))}
          </p>
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
      {entryProps?.coverImageURL && (
        <Image
          {...(entryProps?.blurImageURL ? {
            placeholder: "blur",
            blurDataURL: entryProps.blurImageURL
          } : {})}
          src={entryProps.coverImageURL}
          alt={entryProps.name}
          layout="fill"
          className={style.img}
        />
      )}
    </div>
  );
}
