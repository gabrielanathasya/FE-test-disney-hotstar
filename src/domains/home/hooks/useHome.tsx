import { useMovies } from "@/data/hooks/useMovies";

export const useHome = () => {
  const { data, loading, error } = useMovies();
  return {
    data,
    loading,
    error,
  };
};
