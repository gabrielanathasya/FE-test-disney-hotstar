"use client";

import styles from "./detail.module.css";
import Image from "next/image";
import { languages } from "@/data/consts/languages";
import { useWatchlist } from "@/hooks/useWatchlist";
import WatchNowButton from "@/components/watch-now-button";
import WatchlistButton from "@/components/watchlist-button";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { WatchlistItem } from "@/types/watchlist";
import { MovieDetail } from "@/types/movies";
import { TVShowDetail } from "@/types/tv-shows";
import { Genre, MediaType } from "@/types/common";

type Props = {
  id: number;
  mediaType: MediaType;
  data: MovieDetail | TVShowDetail;
};

export default function Detail({ id, mediaType, data }: Props) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const isCurrentDataInWatchList = isInWatchlist(id);

  const handleClickWatchlist = () => {
    if (isCurrentDataInWatchList) {
      removeFromWatchlist(id);
    } else {
      const wathlistData: WatchlistItem = {
        id: data.id,
        title:
          mediaType === MediaTypeEnum.MOVIE
            ? (data as MovieDetail).title
            : (data as TVShowDetail).name,
        poster_path: data.poster_path ?? "",
        backdrop_path: data.backdrop_path ?? "",
        overview: data.overview,
        release_date:
          mediaType === MediaTypeEnum.MOVIE
            ? (data as MovieDetail).release_date
            : (data as TVShowDetail).last_air_date,
        media_type: mediaType,
        adult: data.adult,
        genre_ids: data.genres?.map((item) => item.id),
        original_language: data.original_language,
      };
      addToWatchlist(wathlistData);
    }
  };

  return (
    <div>
      <div className={styles.topSection}>
        <span className={styles.gradient} />
        <span className={styles.gradientBottom} />
        <div className={styles.backdropContainer}>
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${data.backdrop_path}`}
            fill
            priority
            sizes="100vw"
            alt={
              mediaType === MediaTypeEnum.MOVIE
                ? (data as MovieDetail).title
                : (data as TVShowDetail).name
            }
            className={styles.backdrop}
          />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.title}>
            {mediaType === MediaTypeEnum.MOVIE
              ? (data as MovieDetail).title
              : (data as TVShowDetail).name}
          </h1>
          <div className={styles.subInfo}>
            <p>
              {new Date(
                mediaType === MediaTypeEnum.MOVIE
                  ? (data as MovieDetail).release_date
                  : (data as TVShowDetail).last_air_date,
              ).getFullYear()}
            </p>
            <span className={styles.separator}>&#x2022;</span>
            <p>{languages[data.original_language as keyof typeof languages]}</p>
          </div>
          <p className={styles.description}>{data.overview}</p>
          <div className={`${styles.subInfo} ${styles.genres}`}>
            {data.genres?.map((genre: Genre, i: number) => {
              return (
                <span key={genre.id} className={styles.subInfo}>
                  <p>{genre.name}</p>
                  {i !== data.genres.length - 1 && (
                    <span className={styles.separator}>&#124;</span>
                  )}
                </span>
              );
            })}
          </div>
          <div className={styles.buttonWrapper}>
            <WatchNowButton />
            <WatchlistButton
              handleClickWatchlist={handleClickWatchlist}
              isInWatchlist={isCurrentDataInWatchList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
