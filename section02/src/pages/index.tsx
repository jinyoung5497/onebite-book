import { ReactNode } from "react";
import SearchLayout from "./components/SearchLayout";
import style from "./index.module.css";

export default function Home() {
  return (
    <>
      <SearchLayout>
        <h1 className={style.h1}>hi</h1>
      </SearchLayout>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
