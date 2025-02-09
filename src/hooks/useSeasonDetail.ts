import { TvShowService } from "@/data/services/tv-show-service";
import { SeasonDetail } from "@/types/tv-shows";
import { useState } from "react";

export const useSeasonDetail = ({
  id,
  seasonNumber,
}: {
  id: number;
  seasonNumber: number;
}) => {
  const [data, setData] = useState<SeasonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSeasonDetail = async (id: number) => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await TvShowService.getInstance().getSeasonDetail(
        id,
        seasonNumber,
      );
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getSeasonDetail };
};
