"use client";

import styles from "./search.module.css";
import { Movie } from "@/data/models/movies";
import { useCallback, useEffect, useState } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { TvShow } from "@/data/models/series";
import EmptySearch from "./components/empty-search";
import { useSearchParams, useRouter } from "next/navigation";
import { routes } from "@/data/consts/routes";
import PosterGrid from "./components/poster-grid";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  movies: Movie[];
  tvShow: TvShow[];
  trending: (Movie | TvShow)[];
};

export default function Search({ movies, tvShow, trending }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { debounce } = useDebounce();

  const [query, setQuery] = useState<string>(searchParams?.get("query") ?? "");

  useEffect(() => {
    debounce(() => {
      const params = {
        query,
      };
      const searchParams = new URLSearchParams(params);
      router.replace(`${routes.search}?${searchParams.toString()}`);
    });
  }, [query]);

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleRemoveQuery = () => {
    setQuery("");
  };

  const renderResults = () => {
    console.log({ renderResults });
    return (
      <>
        {movies?.length > 0 && <PosterGrid title="Movies" data={movies} />}
        {tvShow?.length > 0 && <PosterGrid title="TV Shows" data={tvShow} />}
        {!tvShow?.length && !movies?.length && (
          <PosterGrid title="Trending Now" data={trending} />
        )}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <span className={styles.searchbar}>
        <RiSearchLine size={32} />
        <input
          placeholder="Movies, shows, and more"
          className={styles.searchbarInput}
          value={query}
          onChange={handleChangeQuery}
        />
        {query && (
          <RiCloseLine
            className={styles.closeButton}
            onClick={handleRemoveQuery}
            size={40}
          />
        )}
      </span>
      {query && movies?.length === 0 ? (
        <EmptySearch query={query} />
      ) : (
        renderResults()
      )}
    </div>
  );
}
