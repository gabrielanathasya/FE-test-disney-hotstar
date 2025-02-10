"use client";

import { Movie } from "@/types/movies";
import styles from "./poster-grid.module.css";
import PosterImage from "@/components/poster-image";
import { TvShow } from "@/types/tv-shows";
import { MediaType } from "@/types/common";
import { useState } from "react";
import { Watchlist, WatchlistItem } from "@/types/watchlist";

type Result = Movie | TvShow;
type Props = {
  title: string;
  data: Result[] | Watchlist;
  mediaType?: MediaType;
  isCarouselMode?: boolean;
};

export default function PosterGrid({
  title,
  data,
  mediaType,
  isCarouselMode = false,
}: Props) {
  const [currentPopOverId, setCurrentPopOverId] = useState<number | null>(null);

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.grid}>
        {data?.map((item: Result | WatchlistItem) => {
          return (
            <PosterImage
              key={item.id}
              data={item}
              mediaType={mediaType}
              currentPopOverId={currentPopOverId}
              setCurrentPopOverId={setCurrentPopOverId}
            />
          );
        })}
      </div>
    </div>
  );
}
