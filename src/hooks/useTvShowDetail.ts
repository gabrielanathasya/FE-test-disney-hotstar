import { TvShowService } from "@/data/services/tv-show-service";
import { TVShowDetail } from "@/types/tv-shows";
import { useState } from "react";

export const useTvShowDetail = ({ id }: { id: number }) => {
  const [data, setData] = useState<TVShowDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTvShowDetail = async (id: number) => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await TvShowService.getInstance().getDetail(id);
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getTvShowDetail };
};
