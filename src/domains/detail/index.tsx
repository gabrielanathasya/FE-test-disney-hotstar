"use client";

import styles from "./detail.module.css";
import { useWatchlist } from "@/hooks/useWatchlist";
import { MediaTypeEnum } from "@/data/enums/media-type";
import { WatchlistItem } from "@/types/watchlist";
import { MovieDetail } from "@/types/movies";
import { EpisodeDetail, SeasonDetail, TVShowDetail } from "@/types/tv-shows";
import { MediaType } from "@/types/common";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BackdropScreen from "@/components/backdrop-screen";
import Thumbnail from "@/components/thumbnail";
import { formatDate } from "@/utils/format-runtime copy";

type Props = {
  id: number;
  mediaType: MediaType;
  data: MovieDetail | TVShowDetail;
  allSeasonDetails: SeasonDetail[];
};

export default function Detail({
  id,
  mediaType,
  data,
  allSeasonDetails,
}: Props) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [selectedSeason, setSelectedSeason] = useState<number>(1);

  const isCurrentDataInWatchList = isInWatchlist(id);

  const handleClickWatchlist = () => {
    if (isCurrentDataInWatchList) {
      removeFromWatchlist(id);
    } else {
      const wathlistData: WatchlistItem = {
        id: data.id,
        title:
          mediaType === MediaTypeEnum.MOVIE
            ? (data as MovieDetail).title
            : (data as TVShowDetail).name,
        poster_path: data.poster_path ?? "",
        backdrop_path: data.backdrop_path ?? "",
        overview: data.overview,
        release_date:
          mediaType === MediaTypeEnum.MOVIE
            ? (data as MovieDetail).release_date
            : (data as TVShowDetail).first_air_date,
        media_type: mediaType,
        adult: data.adult,
        genre_ids: data.genres?.map((item) => item.id),
        original_language: data.original_language,
      };
      addToWatchlist(wathlistData);
    }
  };

  const handleSelectSeason = (newSeason: number) => {
    setSelectedSeason(newSeason);
  };

  return (
    <div>
      <BackdropScreen
        isShowCarousel={false}
        mediaType={mediaType}
        selectedData={data}
        isCurrentDataInWatchList={isCurrentDataInWatchList}
        handleClickWatchlist={handleClickWatchlist}
      />
      {mediaType === MediaTypeEnum.TV && allSeasonDetails && (
        <div className={styles.bottomSection}>
          <h1 className={styles.bigTab}>Episodes</h1>
          <span className={styles.divider} />
          <div className={styles.tabContainer}>
            {allSeasonDetails.map(
              (seasonDetail: SeasonDetail, index: number) => (
                <span
                  key={index}
                  className={`${styles.tab} ${
                    index + 1 === selectedSeason ? styles.tabSelected : ""
                  }`}
                  onClick={() => handleSelectSeason(index + 1)}
                >
                  {seasonDetail.name}
                </span>
              ),
            )}
          </div>
          <div className={styles.episodesList}>
            {allSeasonDetails[selectedSeason - 1]?.episodes?.map(
              (episode: EpisodeDetail) => {
                return (
                  <div key={episode.id} className={styles.episodeCard}>
                    <div className={styles.thumbnailWrapper}>
                      <Thumbnail alt={episode.name} path={episode.still_path} />
                    </div>
                    <div className={styles.infoSection}>
                      <h3 className={styles.episodeTitle}>{episode.name}</h3>
                      <div className={styles.subInfo}>
                        <p>
                          S{episode.season_number} E{episode.episode_number}
                        </p>
                        <span className={styles.separator}>&#x2022;</span>
                        <p>{formatDate(episode.air_date)}</p>
                        <span className={styles.separator}>&#x2022;</span>
                        <p>{episode.runtime}m</p>
                      </div>
                      <p className={styles.episodeDescription}>
                        {episode.overview}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      )}
    </div>
  );
}
