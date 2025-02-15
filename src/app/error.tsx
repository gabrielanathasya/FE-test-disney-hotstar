"use client";

import styles from "./not-found.module.css";
import Link from "next/link";
import { routes } from "@/configs/routes";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Error</h1>
        <p className={styles.description}>Something went wrong!</p>
        <Link href={routes.home} className={styles.button}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
