"use client";

import styles from "./watchlist-button.module.css";
import { RiCheckFill, RiAddFill } from "react-icons/ri";

type Props = {
  variant?: string;
  size?: string;
  isInWatchlist: boolean;
  handleClickWatchlist: () => void;
};
export default function WatchlistButton({
  variant,
  size,
  handleClickWatchlist,
  isInWatchlist,
}: Props) {
  return (
    <button
      onClick={handleClickWatchlist}
      className={`${styles.buttonWatchList} ${styles.button}`}
    >
      {isInWatchlist ? <RiCheckFill size={28} /> : <RiAddFill size={28} />}
    </button>
  );
}
