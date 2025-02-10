"use client";

import styles from "./watchlist-button.module.css";
import { RiCheckFill, RiAddFill } from "react-icons/ri";

type Size = "md" | "lg";
type Variant = "primary" | "secondary" | "inverse";

type Props = {
  variant: Variant;
  size: Size;
  isInWatchlist: boolean;
  handleClickWatchlist: () => void;
};

export default function WatchlistButton({
  variant = "primary",
  size = "md",
  handleClickWatchlist,
  isInWatchlist,
}: Props) {
  const getVariantClass = (variant: Variant) => {
    switch (variant) {
      case "inverse":
        return styles.buttonInverse;
      case "secondary":
        return styles.buttonSecondary;
      case "primary":
      default:
        return styles.buttonPrimary;
    }
  };

  const getSizeClass = (size: Size) => {
    switch (size) {
      case "lg":
        return styles.buttonSizeLg;
      case "md":
      default:
        return styles.buttonSizeMd;
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        handleClickWatchlist();
      }}
      className={`${styles.button} ${getVariantClass(variant)} ${getSizeClass(
        size,
      )}`}
    >
      {isInWatchlist ? (
        <RiCheckFill size={size === "lg" ? 28 : 24} />
      ) : (
        <RiAddFill size={size === "lg" ? 28 : 24} />
      )}
    </button>
  );
}
