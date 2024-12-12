import { useEffect, useState } from "react";
import BookItem from "../components/BookItem";
import SearchLayout from "../components/SearchLayout";
import fetchBooks from "@/lib/fetchBooks";
import { BookData } from "@/types";
import { useRouter } from "next/router";

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const { q } = router.query;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <SearchLayout>
      <div>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </SearchLayout>
  );
}
