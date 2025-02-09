import { TvShowService } from "@/data/services/tv-show-service";
import { EpisodeDetail, SeasonDetail } from "@/types/tv-shows";
import { useState } from "react";

export const useEpisodeDetail = ({
  id,
  seasonNumber,
  episodeNumber,
}: {
  id: number;
  seasonNumber: number;
  episodeNumber: number;
}) => {
  const [data, setData] = useState<EpisodeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEpisodeDetail = async (id: number) => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await TvShowService.getInstance().getEpisodeDetail(
        id,
        seasonNumber,
        episodeNumber,
      );
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getEpisodeDetail };
};
