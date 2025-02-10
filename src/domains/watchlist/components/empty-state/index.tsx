import styles from "./empty-state.module.css";
import Image from "next/image";

export default function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.imageContainer}>
          <Image
            src="/images/no-result-search.svg"
            height={255}
            width={300}
            alt="no result"
          />
        </div>
        <h3 className={styles.msgTitle}>No Data</h3>
        <p className={styles.msgDescr}>
          Try adding something to your watchlist
        </p>
      </div>
    </div>
  );
}
