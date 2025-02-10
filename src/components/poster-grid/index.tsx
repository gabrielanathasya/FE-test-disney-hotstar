"use client";

import { Movie } from "@/types/movies";
import styles from "./poster-grid.module.css";
import PosterImage from "@/components/poster-image";
import { TvShow } from "@/types/tv-shows";
import { MediaType } from "@/types/common";
import { useEffect, useRef, useState } from "react";
import { Watchlist, WatchlistItem } from "@/types/watchlist";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

type Result = Movie | TvShow;
type Props = {
  title: string;
  data: Result[] | Watchlist;
  mediaType?: MediaType;
  isCarouselMode?: boolean;
  currentPopOverId: number | null;
  setCurrentPopOverId: (value: number | null) => void;
};

export default function PosterGrid({
  title,
  data,
  mediaType,
  isCarouselMode = false,
  currentPopOverId,
  setCurrentPopOverId,
}: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

  const checkScrollable = () => {
    if (carouselRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = carouselRef.current;
      setShowRightArrow(scrollWidth > clientWidth);
      setShowLeftArrow(scrollLeft > 0);
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  const scroll = (direction: "left" | "right"): void => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      carouselRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (): void => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  return (
    <div
      className={`${styles.container} ${
        isCarouselMode ? styles.containerCarousel : ""
      }`}
    >
      <h1
        className={`${styles.title} ${
          isCarouselMode ? styles.titleCarousel : ""
        }`}
      >
        {title}
      </h1>
      <div
        className={`${isCarouselMode ? styles.wrapper : styles.grid}`}
        onMouseEnter={isCarouselMode ? checkScrollable : () => {}}
        onMouseLeave={
          isCarouselMode
            ? () => {
                setShowLeftArrow(false);
                setShowRightArrow(false);
              }
            : () => {}
        }
      >
        {showLeftArrow && (
          <button
            onMouseEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
            onClick={() => scroll("left")}
            className={styles.navButtonLeft}
            aria-label="Scroll left"
          >
            <RiArrowLeftSLine size={50} />
          </button>
        )}
        {showRightArrow && (
          <button
            onMouseEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
            onClick={() => scroll("right")}
            className={styles.navButtonRight}
            aria-label="Scroll right"
          >
            <RiArrowRightSLine size={50} />
          </button>
        )}
        {isCarouselMode ? (
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className={styles.content}
          >
            {data?.map((item: Result | WatchlistItem, i: number) => {
              return (
                <div key={item.id} className={styles.item}>
                  <PosterImage
                    data={item}
                    mediaType={mediaType}
                    currentPopOverId={currentPopOverId}
                    setCurrentPopOverId={setCurrentPopOverId}
                    isCarouselMode={isCarouselMode}
                    isFirst={i === 0}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {data?.map((item: Result | WatchlistItem, i: number) => {
              return (
                <PosterImage
                  key={item.id}
                  data={item}
                  mediaType={mediaType}
                  currentPopOverId={currentPopOverId}
                  setCurrentPopOverId={setCurrentPopOverId}
                  isFirst={i === 0}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
