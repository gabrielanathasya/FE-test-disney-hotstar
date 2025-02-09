"use client";

import { watchlistStorage } from "@/data/storage/watchlist-storage";
import { ReactNode, useEffect, useState } from "react";
import { WatchlistContext } from "@/context/watchlist-context";
import { Watchlist } from "@/types/watchlist";

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
