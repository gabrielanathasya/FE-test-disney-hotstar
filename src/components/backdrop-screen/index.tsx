"use client";

import styles from "./backdrop-screen.module.css";
import Image from "next/image";
import { languages } from "@/data/consts/languages";
import WatchNowButton from "@/components/watch-now-button";
import WatchlistButton from "@/components/watchlist-button";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { Movie, MovieDetail } from "@/types/movies";
import { TVShowDetail } from "@/types/tv-shows";
import { Genre, MediaType } from "@/types/common";
import { genres } from "@/data/consts/genres";

type Props = {
  mediaType: MediaType;
  data: MovieDetail | TVShowDetail | Movie;
  isCurrentDataInWatchList: boolean;
  handleClickWatchlist: () => void;
};

export default function BackdropScreen({
  mediaType,
  data,
  handleClickWatchlist,
  isCurrentDataInWatchList,
}: Props) {
  return (
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
          {!!(data as MovieDetail).genres?.length
            ? (data as MovieDetail).genres?.map((genre: Genre, i: number) => {
                return (
                  <span key={genre.id} className={styles.subInfo}>
                    <p>{genre.name}</p>
                    {i !== (data as MovieDetail).genres?.length - 1 && (
                      <span className={styles.separator}>&#124;</span>
                    )}
                  </span>
                );
              })
            : (data as Movie).genre_ids?.map((genre: number, i: number) => {
                return (
                  <span key={genre} className={styles.subInfo}>
                    <p>{genres[genre as keyof typeof genres]}</p>
                    {i !== (data as Movie).genre_ids.length - 1 && (
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
  );
}
