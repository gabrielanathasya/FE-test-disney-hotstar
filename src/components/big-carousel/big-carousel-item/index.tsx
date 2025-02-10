import Image from "next/image";
import styles from "./big-carousel-item.module.css";
import PopOver from "../../pop-over";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv-shows";
import { useState } from "react";

type Props = {
  data: Movie | TvShow;
  currentPopOverId: number | null;
  setCurrentPopOverId: (value: number | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClearTimeout: () => void;
};

export default function BigCarouselItem({
  data,
  currentPopOverId,
  setCurrentPopOverId,
  onMouseEnter,
  onMouseLeave,
  onClearTimeout,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${data.backdrop_path}`;
  const linkUrl = data.media_type ? `/${data.media_type}/${data.id}` : "/";
  const alt = (data as TvShow).name ?? (data as Movie).title;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={styles.itemContainer}>
      <div
        className={styles.item}
        onMouseEnter={() => setCurrentPopOverId(data.id)}
      >
        <div
          className={styles.image}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onClearTimeout}
        >
          <Image
            src={data.image}
            alt={data.title}
            width={174}
            height={232}
            style={{ objectFit: "cover", borderRadius: "6px" }}
          />
        </div>

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
      />
    </div>
  );
}
