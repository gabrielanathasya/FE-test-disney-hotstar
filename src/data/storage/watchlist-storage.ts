import { Watchlist } from "@/types/watchlist";

const key = "watchlist";
export const watchlistStorage = {
  getAllWatchlist: (): Watchlist => {
    if (typeof window === "undefined") return [];
    const list = localStorage.getItem(key);
    return list ? JSON.parse(list) : [];
  },

  updateWatchlist: (watchlist: Watchlist): void => {
    localStorage.setItem(key, JSON.stringify(watchlist));
  },
};
