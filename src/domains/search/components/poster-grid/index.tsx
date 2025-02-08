"use client";

import { Movie } from "@/data/models/movies";
import { TvShow } from "@/data/models/series";
import { dynamicBlurDataUrl } from "@/utils/dynamic-blur";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./poster-grid.module.css";

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
  return (
    <div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.result}>
        {transformedData?.map((item: TransformedDataItem) => {
          return (
            <div key={item.id} className={styles.resultItem}>
              <Image
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${item.poster_path}`}
                height={232}
                width={174}
                loading="lazy"
                alt={(item as TvShow).name ?? (item as Movie).title}
                className={styles.poster}
                placeholder="blur"
                blurDataURL={item.blurHash}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
