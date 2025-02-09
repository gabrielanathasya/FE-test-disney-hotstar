"use client";

import styles from "./poster-image.module.css";
import { RiImageLine } from "react-icons/ri";
import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MediaType } from "@/types/common";
import { TvShow } from "@/types/tv-shows";
import { Movie } from "@/types/movies";

type Result = Movie | TvShow;

type Props = {
  data: Result;
  mediaType?: MediaType;
};
export default function PosterImage({ data, mediaType }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${data.poster_path}`;
  const linkUrl = mediaType
    ? `/${mediaType}/${data.id}`
    : data.media_type
    ? `/${data.media_type}/${data.id}`
    : "/";
  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  const renderFallbackContent = (item: Result) => {
    const title = (item as TvShow).name ?? (item as Movie).title;
    return (
      <div className={styles.fallbackContainer}>
        <RiImageLine size={30} />
        <span className={styles.fallbackText}>{title}</span>
      </div>
    );
  };

  return (
    <Link href={linkUrl}>
      <div className={styles.wrapper}>
        {isLoading && !hasError && data.poster_path && (
          <span className={styles.skeletonBox} />
        )}

        {data.poster_path && !hasError ? (
          <Image
            src={imageUrl}
            fill
            sizes="(max-width: 480px) 120px, (max-width: 768px) 150px, 200px"
            priority={false}
            alt={(data as TvShow).name ?? (data as Movie).title}
            className={styles.poster}
            onLoad={handleLoad}
            onError={handleError}
          />
        ) : (
          renderFallbackContent(data)
        )}
      </div>
    </Link>
  );
}
