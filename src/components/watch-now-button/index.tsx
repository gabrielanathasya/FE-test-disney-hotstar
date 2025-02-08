"use client";

import styles from "./watch-now-button.module.css";
import { RiPlayFill } from "react-icons/ri";

type Props = {
  variant?: string;
  size?: string;
};
export default function WatchNowButton({ variant, size }: Props) {
  return (
    <button className={`${styles.buttonWatchNow} ${styles.button}`}>
      <RiPlayFill size={24} />
      <p>Watch Now</p>
    </button>
  );
}
