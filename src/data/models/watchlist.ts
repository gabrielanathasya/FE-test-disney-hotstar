import { Movie } from "./movies";
import { TvShow } from "./series";

export type WatchlistItem = Movie | TvShow;
export type Watchlist = WatchlistItem[];
