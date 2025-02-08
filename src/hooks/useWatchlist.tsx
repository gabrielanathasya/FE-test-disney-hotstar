import WatchlistContext from "@/context/watchlist-context";
import { WatchlistItem } from "@/data/models/watchlist";
import { useContext } from "react";

export const useWatchlist = () => {
  const { watchlist, setWatchlist } = useContext(WatchlistContext);

  const addToWatchlist = (watchlistItem: WatchlistItem) => {
    const newWatchlist = [...watchlist, watchlistItem];
    setWatchlist(newWatchlist);
  };

  const removeFromWatchlist = (id: number) => {
    const newWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(newWatchlist);
  };

  const isInWatchlist = (movieId: number) => {
    return !!watchlist.find((movie) => movie.id === movieId);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };
};
