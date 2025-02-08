"use client";

import { Movie } from "@/data/models/movies";
import { TvShow } from "@/data/models/series";
import { dynamicBlurDataUrl } from "@/utils/dynamic-blur";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./poster-grid.module.css";
import { RiImageLine } from "react-icons/ri";

type Result = Movie | TvShow;
type TransformedDataItem = Result & { blurHash: string };
type Props = {
  title: string;
  data: Result[];
};

export default function PosterGrid({ title, data }: Props) {
  const [transformedData, setTransformedData] = useState<TransformedDataItem[]>(
    [],
  );

  useEffect(() => {
    if (data) {
      const modifyData = async () => {
        const dataWithBlurHash = await getResources(data);
        setTransformedData(dataWithBlurHash);
      };

      modifyData();
    }
  }, [data]);

  const getResources = async (data: Result[]) => {
    const resources = await Promise.all(
      data?.map(async (item) => ({
        ...item,
        blurHash: await dynamicBlurDataUrl(
          `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${item.poster_path}`,
        ),
      })),
    );

    return resources;
  };

  const getFallbackContent = (item: TransformedDataItem) => {
    const title = (item as TvShow).name ?? (item as Movie).title;
    return (
      <div className={styles.fallbackContainer}>
        <RiImageLine size={30} />
        <span className={styles.fallbackText}>{title}</span>
      </div>
    );
  };

  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.grid}>
        {transformedData?.map((item: TransformedDataItem) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${item.poster_path}`;

          return (
            <div key={item.id} className={styles.gridItem}>
              {
                //!imageErrors[item.id] &&
                item.poster_path ? (
                  <Image
                    src={imageUrl}
                    fill
                    sizes="(max-width: 480px) 120px, (max-width: 768px) 150px, 200px"
                    priority={false}
                    alt={(item as TvShow).name ?? (item as Movie).title}
                    className={styles.poster}
                    placeholder="blur"
                    blurDataURL={item.blurHash}
                    // onError={() => handleImageError(item.id)}
                  />
                ) : (
                  getFallbackContent(item)
                )
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
