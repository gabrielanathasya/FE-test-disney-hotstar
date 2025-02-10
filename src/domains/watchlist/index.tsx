"use client";

import { useWatchlist } from "@/hooks/useWatchlist";
import styles from "./watchlist.module.css";
import PosterGrid from "../../components/poster-grid";
import EmptyState from "./components/empty-state";
import { useState } from "react";

export default function Watchlist() {
  const [currentPopOverId, setCurrentPopOverId] = useState<number | null>(null);
  const { watchlist } = useWatchlist();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Watchlist</h1>
      {!watchlist.length ? (
        <EmptyState />
      ) : (
        <PosterGrid
          title=""
          data={watchlist}
          currentPopOverId={currentPopOverId}
          setCurrentPopOverId={setCurrentPopOverId}
        />
      )}
    </div>
  );
}
