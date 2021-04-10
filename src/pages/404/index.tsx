import React from 'react';

import style from './style.module.css';

export default function Error404Page(props) {
  return (
    <>
    <div className={style.main}>
      <img className={style.icon} src={props.isDarkMode ? "/images/404/dark-404.png" : "/images/404/light-404.png"} alt="404 Icon"/>
      <h1 className={style.alert}>Oops! Nothing to see here. </h1>
    </div>
    </>
  )
}