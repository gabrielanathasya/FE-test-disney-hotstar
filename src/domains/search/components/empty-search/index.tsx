import styles from "./empty-search.module.css";
import Image from "next/image";

type Props = {
  query: string;
};

export default function EmptySearch({ query }: Props) {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.imageContainer}>
          <Image
            src="/images/no-result-search.svg"
            height={255}
            width={300}
            alt="no result search"
          />
        </div>
        <h3 className={styles.msgTitle}>
          Couldn&#x2018t find &#x201C{query}&#x201D
        </h3>
        <p className={styles.msgDescr}>
          Try searching for something else or try with a different spelling
        </p>
      </div>
    </div>
  );
}
