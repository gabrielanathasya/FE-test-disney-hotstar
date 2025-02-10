import Image from "next/image";
import WatchNowButton from "@/components/watch-now-button";
import WatchlistButton from "@/components/watchlist-button";
import styles from "./pop-over.module.css";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv-shows";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { languages } from "@/data/consts/languages";
import { useState } from "react";
import Link from "next/link";
import FallbackImage from "../fallback-image";
import { useWatchlist } from "@/hooks/useWatchlist";
import { WatchlistItem } from "@/types/watchlist";
import { useRouter } from "next/navigation";

type Props = {
  data: Movie | TvShow | WatchlistItem;
  isVisible: boolean;
  onMouseLeave: () => void;
};

export default function PopOver({ data, isVisible, onMouseLeave }: Props) {
  const router = useRouter();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${data.backdrop_path}`;
  const alt = (data as TvShow).name ?? (data as Movie).title;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const isCurrentDataInWatchList = isInWatchlist(data.id);

  const handleClickWatchlist = () => {
    if (isCurrentDataInWatchList) {
      removeFromWatchlist(data.id);
    } else {
      const wathlistData: WatchlistItem = {
        id: data.id,
        title:
          data.media_type === MediaTypeEnum.MOVIE
            ? (data as Movie).title
            : (data as TvShow).name,
        poster_path: data.poster_path ?? "",
        backdrop_path: data.backdrop_path ?? "",
        overview: data.overview,
        release_date:
          data.media_type === MediaTypeEnum.MOVIE
            ? (data as Movie).release_date
            : (data as TvShow).first_air_date,
        media_type: data.media_type,
        adult: data.adult,
        genre_ids: data.genre_ids,
        original_language: data.original_language,
      };
      addToWatchlist(wathlistData);
    }
  };

  const handleClick = () => {
    router.push(data.media_type ? `/${data.media_type}/${data.id}` : "/");
  };

  console.log({ data });

  return (
    <div
      className={`${styles.container} ${
        isVisible ? styles.containerShow : styles.containerHide
      }`}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      <div className={styles.popOver}>
        <div className={styles.image}>
          <span className={styles.gradientBottom} />
          {isLoading && !hasError && data.poster_path && (
            <span className={styles.skeletonBox} />
          )}

          {data.poster_path && !hasError ? (
            <Image
              src={imageUrl}
              alt={alt}
              width={286}
              height={138}
              style={{
                objectFit: "cover",
                borderRadius: "12px 12px 0px 0px",
              }}
              onLoad={handleLoad}
              onError={handleError}
            />
          ) : (
            <FallbackImage name={alt} />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.buttonGroup}>
            <WatchNowButton size="md" variant="primary" />
            <WatchlistButton
              size="md"
              variant="secondary"
              handleClickWatchlist={handleClickWatchlist}
              isInWatchlist={isCurrentDataInWatchList}
            />
          </div>
          <div className={styles.subInfo}>
            <p className={styles.label}>
              {new Date(
                (data as Movie).release_date ?? (data as TvShow).first_air_date,
              ).getFullYear()}
            </p>
            <span className={styles.separator}>&#x2022;</span>
            <p className={styles.label}>
              {" "}
              {languages[data.original_language as keyof typeof languages]}
            </p>
          </div>
          <p className={styles.description}>{data.overview}</p>
        </div>
      </div>
    </div>
  );
}
