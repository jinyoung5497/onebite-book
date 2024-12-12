import { ReactNode } from "react";
import SearchLayout from "./components/SearchLayout";
import style from "./index.module.css";
import BookItem from "./components/BookItem";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetchBooks";
import fetchRandomBooks from "@/lib/fetchRandomBooks";

export const getStaticProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
  const [allBooks, recommendBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recommendBooks,
    },
  };
};

export default function Home({
  allBooks,
  recommendBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
