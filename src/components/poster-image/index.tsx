"use client";

import styles from "./poster-image.module.css";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MediaType } from "@/types/common";
import { TvShow } from "@/types/tv-shows";
import { Movie } from "@/types/movies";
import FallbackImage from "../fallback-image";
import PopOver from "../pop-over";
import { WatchlistItem } from "@/types/watchlist";

type Result = Movie | TvShow;

type Props = {
  data: Result | WatchlistItem;
  mediaType?: MediaType;
  currentPopOverId: number | null;
  setCurrentPopOverId: (value: number | null) => void;
  isCarouselMode?: boolean;
  isFirst?: boolean;
};
export default function PosterImage({
  data,
  mediaType,
  currentPopOverId,
  setCurrentPopOverId,
  isCarouselMode = false,
  isFirst = false,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${data.poster_path}`;
  const linkUrl = mediaType
    ? `/${mediaType}/${data.id}`
    : data.media_type
    ? `/${data.media_type}/${data.id}`
    : "/";
  const alt = (data as TvShow).name ?? (data as Movie).title;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Link href={linkUrl}>
      <div className={styles.popOverContainer}>
        <div
          className={`${styles.wrapper} ${
            isCarouselMode ? styles.wrapperMargin : ""
          }`}
          onMouseEnter={() => setCurrentPopOverId(data.id)}
        >
          {isLoading && !hasError && data.poster_path && (
            <span className={styles.skeletonBox} />
          )}

          {data.poster_path && !hasError ? (
            <Image
              src={imageUrl}
              fill
              sizes="(max-width: 480px) 120px, (max-width: 768px) 150px, 200px"
              priority={false}
              alt={alt}
              className={styles.poster}
              onLoad={handleLoad}
              onError={handleError}
            />
          ) : (
            <FallbackImage name={alt} />
          )}
        </div>
        <PopOver
          data={data}
          isVisible={data.id === currentPopOverId}
          onMouseLeave={() => setCurrentPopOverId(null)}
          isCarouselMode={isCarouselMode}
          isFirst={isFirst}
        />
      </div>
    </Link>
  );
}
