import Image from "next/legacy/image";

import { useDarkMode } from '../../hooks/useDarkMode';

import style from './style.module.scss';

export default function Error404Page() {
  const isDarkMode = useDarkMode()

  return (
    <div className={style.main}>
      <Image className={style.icon} src={isDarkMode ? "/images/404/dark-404.png" : "/images/404/light-404.png"} alt="404 Icon" width={1087/3} height={1015/3}/>
      <h1 className={style.alert}>Oops! Nothing to see here. </h1>
    </div>
  )
}