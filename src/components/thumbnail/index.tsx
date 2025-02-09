"use client";

import styles from "./thumbnail.module.css";
import { useState } from "react";
import Image from "next/image";
import FallbackImage from "../fallback-image";

type Props = {
  alt: string;
  path?: string | null;
};
export default function Thumbnail({ alt, path }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${path}`;
  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={styles.wrapper}>
      {isLoading && !hasError && path && (
        <span className={styles.skeletonBox} />
      )}

      {path && !hasError ? (
        <Image
          src={imageUrl}
          fill
          sizes="(max-width: 480px) 120px, (max-width: 768px) 150px, 200px"
          priority={false}
          alt={alt}
          className={styles.thumbnail}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <FallbackImage name={alt} />
      )}
    </div>
  );
}
