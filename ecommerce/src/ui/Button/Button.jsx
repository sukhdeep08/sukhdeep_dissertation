/* eslint-disable react/prop-types */

import styles from "./Button.module.css";
function Button({ children }) {
  return (
    <div>
      <button className={`${styles.btn} ${styles.btnFlex}`}>{children}</button>
    </div>
  );
}

export default Button;
