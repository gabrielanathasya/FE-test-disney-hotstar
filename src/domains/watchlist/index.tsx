"use client";

import { useWatchlist } from "@/hooks/useWatchlist";
import styles from "./watchlist.module.css";
import PosterGrid from "../../components/poster-grid";
import EmptyState from "./components/empty-state";

export default function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Watchlist</h1>
      {!watchlist.length ? (
        <EmptyState />
      ) : (
        <PosterGrid title="" data={watchlist} />
      )}
    </div>
  );
}
