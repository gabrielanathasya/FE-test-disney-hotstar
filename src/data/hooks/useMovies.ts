import { useEffect, useState } from "react";
import { endpoints } from "../consts/endpoints";
import { Movie } from "../models/movies";
import { TvShow } from "../models/series";
import { tmdbService } from "../services/tmdb-service";
import { useQuery } from "@tanstack/react-query";

// const fetchMovies = async (): Promise<Movie | TvShow> => {
//   const { data } = await tmdbService.get(endpoints.horrorMovies);

//   return data;
// };

export const useMovies = () => {
  // const {
  //   data: moviesData,
  //   error: moviesError,
  //   isLoading: isLoadingMovies,
  //   refetch: refetchMovies,
  // } = useQuery({
  //   queryKey: ["movies"],
  //   queryFn: () => fetchMovies(),
  // });

  const [data, setData] = useState<(Movie | TvShow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // const response = await tmdbService.get(endpoints.horrorMovies);
      // setData(response.data.results);

      const response = await tmdbService(endpoints.horrorMovies);
      setData(response.results);
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

  return { data };
  // return { moviesData, moviesError, isLoadingMovies, refetchMovies };
};
