import Link from "next/link";
import Image from "next/future/image";

import style from "./style.module.scss";
import ThemeBadge from "../../theme/badge";
import { WorksDiscipline, WorksNotability, WorksProperties } from "../../../data/works";
import clsx from "clsx";

export default function HomeTile({
  entryProps,
}: {
  entryProps: WorksProperties;
}) {
  return (
    <div
      className={clsx(style.tile, entryProps?.coverImageURL && style.imgLoaded)}
      style={{
        gridColumn: `span ${entryProps.notability === WorksNotability.High ? 2 : 1}`,
      }}
    >
      <Link href={entryProps.url || `/works/${entryProps.id}`}>
        <a className={style.desc}>
          <h1>{entryProps.name}</h1>
          <h3>{entryProps.recognition}</h3>
          <p className={style.badges}>
          {entryProps.discipline.map((e, i) => (
              <ThemeBadge key={i} discipline={e}>{WorksDiscipline[e]}</ThemeBadge>
            ))}
          </p>
          <p className={style.expandable}>
            {entryProps.writeUp}
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
          src={entryProps.coverImageURL}
          alt={entryProps.name}
          className={style.img}
          unoptimized
        />
      )}
    </div>
  );
}
