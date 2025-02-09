import { MediaType } from "./common";

export type WatchlistItem = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  media_type?: MediaType;
  adult?: boolean;
  genre_ids: number[];
  original_language: string;
};
export type Watchlist = WatchlistItem[];
