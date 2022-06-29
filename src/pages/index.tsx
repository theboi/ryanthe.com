import style from "./style.module.scss";
import HomeHeader from "../components/home/header";
import HomeListing from "../components/home/listing";
import HomePersonalResponse from "../components/home/personalResponse";

export default function HomePage() {
  return (
    <div className={style.main}>
      <HomeHeader />
      <hr />
      <HomePersonalResponse />
      <HomeListing />
    </div>
  );
}
