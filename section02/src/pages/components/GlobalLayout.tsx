import React, { ReactNode } from "react";
import Link from "next/link";
import style from "./GlobalLayout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>ONEBITE BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @Jinyoung</footer>
    </div>
  );
}
