"use client";

import styles from "./not-found.module.css";
import Link from "next/link";
import { routes } from "@/configs/routes";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href={routes.home} className={styles.button}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
