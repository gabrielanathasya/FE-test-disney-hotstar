import { Movie } from "@/types/movies";

export type NowPlayingMovieResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
};

export type SearchMovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type TopRatedMovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
