import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
};
export default Loading;
