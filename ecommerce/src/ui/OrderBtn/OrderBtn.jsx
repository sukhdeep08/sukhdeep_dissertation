import { useState, useEffect } from "react";
import styles from "./OrderBtn.module.css";

function OrderBtn() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start the animation when the component mounts
    setIsAnimating(true);

    // Stop the animation after 10 seconds
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
    }, 10000);

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <button
      className={
        isAnimating ? `${styles.order} ${styles.animate}` : styles.order
      }
    >
      <span className={styles.default}></span>
      <span className={styles.success}>
        Order Placed
        <svg viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      <div className={styles.box}></div>
      <div className={styles.truck}>
        <div className={styles.back}></div>
        <div className={styles.front}>
          <div className={styles.window}></div>
        </div>
        <div className={`${styles.light} ${styles.top}`}></div>
        <div className={`${styles.light} ${styles.bottom}`}></div>
      </div>
      <div className={styles.lines}></div>
    </button>
  );
}

export default OrderBtn;
