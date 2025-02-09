"use client";

import { Movie } from "@/data/models/movies";
import { TvShow } from "@/data/models/tv-shows";
import styles from "./poster-grid.module.css";
import PosterImage from "@/components/poster-image";
import { MediaType } from "@/data/models/common";

type Result = Movie | TvShow;
type Props = {
  title: string;
  data: Result[];
  mediaType?: MediaType;
};

export default function PosterGrid({ title, data, mediaType }: Props) {
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.grid}>
        {data?.map((item: Result) => {
          return (
            <PosterImage key={item.id} data={item} mediaType={mediaType} />
          );
        })}
      </div>
    </div>
  );
}
