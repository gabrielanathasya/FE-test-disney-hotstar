import WatchlistContext from "@/context/watchlist-context";
import { WatchlistItem } from "@/types/watchlist";
import { useContext } from "react";

export const useWatchlist = () => {
  const { watchlist, setWatchlist } = useContext(WatchlistContext);

  const addToWatchlist = (watchlistItem: WatchlistItem) => {
    const newWatchlist = [...watchlist, watchlistItem];
    setWatchlist(newWatchlist);
  };

  const removeFromWatchlist = (id: number) => {
    const newWatchlist = watchlist.filter(
      (item: WatchlistItem) => item.id !== id,
    );
    setWatchlist(newWatchlist);
  };

  const isInWatchlist = (id: number) => {
    return !!watchlist.find((item: WatchlistItem) => item.id === id);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
};
