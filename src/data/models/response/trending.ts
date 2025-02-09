import { Movie } from "@/types/movies";
import { TvShow } from "@/types/tv-shows";

export type TrendingResponse = {
  total_pages: number;
  total_results: number;
  page: number;
  results: (Movie | TvShow)[];
};
