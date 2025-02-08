"use client";

import styles from "./home.module.css";
import { Movie } from "@/data/models/movies";
import { useState } from "react";
import Image from "next/image";
import { languages } from "@/data/consts/languages";
import { genres } from "@/data/consts/genres";
import { RiAddFill, RiPlayFill } from "react-icons/ri";

type Props = {
  movies: Movie[];
};

export default function Home({ movies }: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  console.log({ movies });

  return (
    <div>
      <div className={styles.topSection}>
        <span className={styles.gradient} />
        <div className={styles.backdropContainer}>
          <Image
            src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${selectedMovie.backdrop_path}`}
            fill
            priority
            sizes="100vw"
            alt={selectedMovie.title}
            className={styles.backdrop}
          />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{selectedMovie.title}</h1>
          <div className={styles.subInfo}>
            <p>{new Date(selectedMovie.release_date).getFullYear()}</p>
            <span className={styles.separator}>&#x2022;</span>
            <p>
              {
                languages[
                  selectedMovie.original_language as keyof typeof languages
                ]
              }
            </p>
          </div>
          <p className={styles.description}>{selectedMovie.overview}</p>
          <div className={`${styles.subInfo} ${styles.genres}`}>
            {selectedMovie.genre_ids?.map((genre: number, i: number) => {
              return (
                <>
                  <p>{genres[genre as keyof typeof genres]}</p>
                  {i !== selectedMovie.genre_ids.length - 1 && (
                    <span className={styles.separator}>&#124;</span>
                  )}
                </>
              );
            })}
          </div>
          <div className={styles.buttonWrapper}>
            <button className={`${styles.buttonWatchNow} ${styles.button}`}>
              <RiPlayFill size={24} />
              <p>Watch Now</p>
            </button>
            <button className={`${styles.buttonWatchList} ${styles.button}`}>
              <RiAddFill size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
