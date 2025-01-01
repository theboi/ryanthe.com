import Image from "next/legacy/image";

import style from './not-found.module.scss';

export default function Error404Page() {

  return (
    <div className={style.main}>
      <Image className={style.icon} src="/images/404/light-404.png" alt="404 Icon" width={1087/3} height={1015/3}/>
      <h1 className={style.alert}>Oops! Nothing to see here. </h1>
    </div>
  )
}