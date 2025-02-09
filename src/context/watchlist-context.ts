"use client";

import { Watchlist } from "@/types/watchlist";
import { createContext } from "react";
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
