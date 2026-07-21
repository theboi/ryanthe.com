import NavBar from "../../src/components/theme/navbar";
import Footer from "../../src/components/theme/footer";
import style from "../_app.module.scss";

export default function LegacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className={style.main}>
        <NavBar />
        <div className={style.content}>{children}</div>
        <Footer />
      </div>
    </main>
  );
}
