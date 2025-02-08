"use client";

import { createContext } from "react";
import { Watchlist } from "@/data/models/watchlist";
import { Dispatch, SetStateAction } from "react";

export interface WatchlistContextType {
  watchlist: Watchlist;
  setWatchlist: Dispatch<SetStateAction<Watchlist>>;
}

export const WatchlistContext = createContext<WatchlistContextType>({
  watchlist: [],
  setWatchlist: () => {},
});

export default WatchlistContext;
