import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "./SearchLayout.module.css";

export default function SearchLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const { q } = router.query;

  useEffect(() => {
    if (typeof q === "string") {
      setSearch(q || "");
    }
  }, [q]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          type="text"
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
