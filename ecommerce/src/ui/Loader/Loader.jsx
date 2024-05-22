import styles from "./Loader.module.css";
function Loader() {
  return (
    <div className={styles.loaderContainerStyle}>
      <div className={styles.bars1}></div>
    </div>
  );
}

export default Loader;
