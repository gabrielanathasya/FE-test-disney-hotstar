"use client";

import styles from "./fallback-image.module.css";
import { RiImageLine } from "react-icons/ri";

type Props = {
  name: string;
};
export default function FallbackImage({ name }: Props) {
  return (
    <div className={styles.fallbackContainer}>
      <RiImageLine size={30} />
      <span className={styles.fallbackText}>{name}</span>
    </div>
  );
}
