import style from "./style.module.scss"
import { HomeHeader } from "./_components/header";
import HomeListing from "../src/components/home/listing";

export default function Page() {
  return (
    <div className={style.main}>
      <HomeHeader />
      <hr />
      {/* <HomePersonalResponse /> */}
      <HomeListing />
    </div>
  );
}