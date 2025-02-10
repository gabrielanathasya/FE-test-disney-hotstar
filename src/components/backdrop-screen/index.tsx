"use client";

import styles from "./backdrop-screen.module.css";
import Image from "next/image";
import { languages } from "@/data/consts/languages";
import WatchNowButton from "@/components/watch-now-button";
import WatchlistButton from "@/components/watchlist-button";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { Movie, MovieDetail } from "@/types/movies";
import { TvShow, TVShowDetail } from "@/types/tv-shows";
import { Genre, MediaType } from "@/types/common";
import { genres } from "@/data/consts/genres";
import FeaturedCarousel from "@/components/featured-carousel";

type Props = {
  mediaType: MediaType;
  selectedData: any;
  setSelectedData?: (value: any) => void;
  data?: (TvShow | Movie)[];
  isShowCarousel: boolean;
  isCurrentDataInWatchList: boolean;
  handleClickWatchlist: () => void;
};

export default function BackdropScreen({
  mediaType,
  selectedData,
  setSelectedData,
  handleClickWatchlist,
  isCurrentDataInWatchList,
  data,
  isShowCarousel = false,
}: Props) {
  return (
    <div className={styles.topSection}>
      <span className={styles.gradient} />
      <span className={styles.gradientBottom} />
      <div className={styles.backdropContainer}>
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${selectedData.backdrop_path}`}
          fill
          priority
          sizes="100vw"
          alt={
            mediaType === MediaTypeEnum.MOVIE
              ? selectedData.title
              : selectedData.name
          }
          className={styles.backdrop}
        />
      </div>
      <div className={styles.infoSection}>
        <h1 className={styles.title}>
          {mediaType === MediaTypeEnum.MOVIE
            ? selectedData.title
            : selectedData.name}
        </h1>
        <div className={styles.subInfo}>
          <p>
            {new Date(
              mediaType === MediaTypeEnum.MOVIE
                ? selectedData.release_date
                : selectedData.first_air_date,
            ).getFullYear()}
          </p>
          <span className={styles.separator}>&#x2022;</span>
          <p>
            {
              languages[
                selectedData.original_language as keyof typeof languages
              ]
            }
          </p>
        </div>
        <p className={styles.description}>{selectedData.overview}</p>
        <div className={`${styles.subInfo} ${styles.genres}`}>
          {!!selectedData.genres?.length
            ? selectedData.genres?.map((genre: Genre, i: number) => {
                return (
                  <span key={genre.id} className={styles.subInfo}>
                    <p>{genre.name}</p>
                    {i !== selectedData.genres?.length - 1 && (
                      <span className={styles.separator}>&#124;</span>
                    )}
                  </span>
                );
              })
            : selectedData.genre_ids?.map((genre: number, i: number) => {
                return (
                  <span key={genre} className={styles.subInfo}>
                    <p>{genres[genre as keyof typeof genres]}</p>
                    {i !== selectedData.genre_ids.length - 1 && (
                      <span className={styles.separator}>&#124;</span>
                    )}
                  </span>
                );
              })}
        </div>
        <div className={styles.buttonWrapper}>
          <WatchNowButton variant="secondary" size="lg" />
          <WatchlistButton
            handleClickWatchlist={handleClickWatchlist}
            isInWatchlist={isCurrentDataInWatchList}
            variant="secondary"
            size="lg"
          />
        </div>
      </div>
      {isShowCarousel && (
        <div className={styles.carouselWrapper}>
          <FeaturedCarousel
            data={data}
            selectedData={selectedData}
            setSelectedData={setSelectedData ? setSelectedData : () => {}}
          />
        </div>
      )}
    </div>
  );
}
