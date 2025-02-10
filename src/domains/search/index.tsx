"use client";

import styles from "./search.module.css";
import { useEffect, useState } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import EmptySearch from "./components/empty-search";
import { useSearchParams, useRouter } from "next/navigation";
import PosterGrid from "../../components/poster-grid";
import { useDebounce } from "@/hooks/useDebounce";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { routes } from "@/configs/routes";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv-shows";

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
    return (
      <>
        {movies?.length > 0 && (
          <PosterGrid
            title="Movies"
            data={movies}
            mediaType={MediaTypeEnum.MOVIE}
          />
        )}
        {tvShow?.length > 0 && (
          <PosterGrid
            title="TV Shows"
            data={tvShow}
            mediaType={MediaTypeEnum.TV}
          />
        )}
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
      {query && !movies?.length ? (
        <EmptySearch query={query} />
      ) : (
        <div className={styles.resultGrid}>{renderResults()}</div>
      )}
    </div>
  );
}
