"use client";

import { Watchlist } from "@/data/models/watchlist";
import { watchlistStorage } from "@/data/storage/watchlist-storage";
import { ReactNode, useEffect, useState } from "react";
import { WatchlistContext } from "@/context/watchlist-context";

interface WatchlistProviderProps {
  children: ReactNode;
}

const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
  const [watchlist, setWatchlist] = useState<Watchlist>([]);

  useEffect(() => {
    setWatchlist(watchlistStorage.getAllWatchlist());
  }, []);

  useEffect(() => {
    watchlistStorage.updateWatchlist(watchlist);
  }, [watchlist]);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
