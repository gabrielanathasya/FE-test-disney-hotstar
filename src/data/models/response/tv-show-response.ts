import { TvShow } from "@/types/tv-shows";

export type SearchTvShowResponse = {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
};

export type TopRatedTvShowResponse = {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
};
