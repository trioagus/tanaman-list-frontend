import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <div className={styles.text}>Loading...</div>
        <div className={styles.shadow}></div>
      </div>
    </div>
  );
};

export default Loading;
