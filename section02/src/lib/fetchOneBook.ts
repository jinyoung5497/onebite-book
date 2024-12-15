import { BookData } from "@/types";

export const fetchOneBook = async (id: number): Promise<BookData | null> => {
  const url = `https://onebite-books-server-main-murex.vercel.app/book/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
