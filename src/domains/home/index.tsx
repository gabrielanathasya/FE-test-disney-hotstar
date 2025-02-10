"use client";

import styles from "./home.module.css";
import { useState } from "react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Movie } from "@/types/movies";
import BackdropScreen from "@/components/backdrop-screen";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { TvShow } from "@/types/tv-shows";
import { WatchlistItem } from "@/types/watchlist";

type Props = {
  topRatedTvShow: TvShow[];
  topRatedMovie: Movie[];
  trendingTvShow: TvShow[];
  trendingMovie: Movie[];
};

export default function Home({
  topRatedTvShow,
  topRatedMovie,
  trendingTvShow,
  trendingMovie,
}: Props) {
  const [selectedData, setSelectedData] = useState<Movie | TvShow>(
    topRatedTvShow[0],
  );
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const isCurrentSelectedMovieInWatchList = isInWatchlist(selectedData.id);

  const handleClickWatchlist = () => {
    if (isCurrentSelectedMovieInWatchList) {
      removeFromWatchlist(selectedData.id);
    } else {
      const wathlistData: WatchlistItem = {
        id: selectedData.id,
        title:
          selectedData.media_type === MediaTypeEnum.MOVIE
            ? (selectedData as Movie).title
            : (selectedData as TvShow).name,
        poster_path: selectedData.poster_path ?? "",
        backdrop_path: selectedData.backdrop_path ?? "",
        overview: selectedData.overview,
        release_date:
          selectedData.media_type === MediaTypeEnum.MOVIE
            ? (selectedData as Movie).release_date
            : (selectedData as TvShow).first_air_date,
        media_type: selectedData.media_type,
        adult: selectedData.adult,
        genre_ids: selectedData.genre_ids,
        original_language: selectedData.original_language,
      };
      addToWatchlist(wathlistData);
    }
  };

  return (
    <div>
      <BackdropScreen
        isShowCarousel={true}
        mediaType={selectedData.media_type ?? MediaTypeEnum.TV}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        isCurrentDataInWatchList={isCurrentSelectedMovieInWatchList}
        handleClickWatchlist={handleClickWatchlist}
        data={topRatedTvShow}
      />
    </div>
  );
}
