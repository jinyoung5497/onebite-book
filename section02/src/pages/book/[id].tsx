import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import { fetchOneBook } from "@/lib/fetchOneBook";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (context.params) {
    const id = context.params.id;
    const oneBook = await fetchOneBook(Number(id));
    return {
      props: {
        oneBook,
      },
    };
  }
};

export default function Page({
  oneBook,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!oneBook) throw new Error();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    oneBook;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
