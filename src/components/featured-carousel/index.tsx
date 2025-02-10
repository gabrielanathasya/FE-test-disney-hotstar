import { useState, useRef, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import styles from "./featured-carousel.module.css";
import Image from "next/image";
import { TvShow } from "@/types/tv-shows";
import { Movie } from "@/types/movies";

type ItemData = Movie | TvShow;

type Props = {
  data?: (Movie | TvShow)[];
  selectedData: ItemData;
  setSelectedData: (value: ItemData) => void;
};

export default function FeaturedCarousel({
  data,
  selectedData,
  setSelectedData,
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

  const handleItemClick = (item: ItemData) => {
    setSelectedData(item);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.wrapper}
        onMouseEnter={checkScrollable}
        onMouseLeave={() => {
          setShowLeftArrow(false);
          setShowRightArrow(false);
        }}
      >
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className={styles.navButtonLeft}
            aria-label="Scroll left"
          >
            <RiArrowLeftSLine size={40} />
          </button>
        )}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className={styles.navButtonRight}
            aria-label="Scroll right"
          >
            <RiArrowRightSLine size={40} />
          </button>
        )}

        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className={styles.content}
        >
          {data?.map((item) => (
            <div
              key={item.id}
              className={`${styles.item} ${
                selectedData.id === item.id ? styles.itemActive : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              <div className={styles.image}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${item.backdrop_path}`}
                  alt={(item as Movie).title ?? (item as TvShow).name}
                  fill
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
