import style from "./style.module.scss";
import HomeHeader from "../components/home/header";
import HomeListing from "../components/home/listing";

export default function HomePage() {

  return (
    <div className={style.main}>
      <HomeHeader />
      <hr />
      <HomeListing />
    </div>
  );
}
