import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

type Props = {
  searchParams: Promise<{ q: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q} : 한입북스 검색`,
    description: `${q} 검색 결과입니다`,
    openGraph: {
      title: `${q} : 한입북스 검색`,
      description: `${q} 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResult searchParams={searchParams} />
    </Suspense>
  );
}
