// BigCarousel.tsx
import React, { useState, useRef } from "react";
import BigCarouselItem from "./big-carousel-item";
import style from "./big-carousel.module.css";
import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv-shows";

interface BigCarouselProps {
  items: (Movie | TvShow)[];
}

export default function BigCarousel({ items }: BigCarouselProps) {
  const [activePopOverId, setActivePopOverId] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (itemId: number) => {
    if (activePopOverId !== itemId) {
      timeoutRef.current = setTimeout(() => {
        setActivePopOverId(itemId);
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    setActivePopOverId(null);
  };

  const clearTimeoutOnLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.itemGroup}>
          {items.map((item) => (
            <BigCarouselItem
              key={item.id}
              item={item}
              isPopOverVisible={activePopOverId === item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              onClearTimeout={clearTimeoutOnLeave}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
