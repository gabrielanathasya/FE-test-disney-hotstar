"use client";

import styles from "./home.module.css";
import { useState } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Movie } from "@/types/movies";
import BackdropScreen from "@/components/backdrop-screen";
import { MediaTypeEnum } from "@/data/enums/media-type";

type Props = {
  movies: Movie[];
};

export default function Home({ movies }: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const isCurrentSelectedMovieInWatchList = isInWatchlist(selectedMovie.id);

  const handleClickWatchlist = () => {
    if (isCurrentSelectedMovieInWatchList) {
      removeFromWatchlist(selectedMovie.id);
    } else {
      addToWatchlist(selectedMovie);
    }
  };

  return (
    <div>
      <BackdropScreen
        mediaType={selectedMovie.media_type ?? MediaTypeEnum.MOVIE}
        data={selectedMovie}
        isCurrentDataInWatchList={isCurrentSelectedMovieInWatchList}
        handleClickWatchlist={handleClickWatchlist}
      />
    </div>
  );
}
