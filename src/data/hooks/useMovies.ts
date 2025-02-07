import { useEffect, useState } from "react";
import { endpoints } from "../consts/endpoints";
import { Movie } from "../models/movies";
import { TvShow } from "../models/series";
import { tmdbService } from "../services/tmdb-service";

export const useMovies = () => {
  const [data, setData] = useState<(Movie | TvShow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await tmdbService.get(endpoints.horrorMovies);
      setData(response.data.results);
    } catch (err) {
      setError("Error fetching data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
