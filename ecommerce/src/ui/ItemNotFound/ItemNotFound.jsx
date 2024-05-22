import styles from "./ItemNotFound.module.css";
import itemNotFoundImg from "../../images/ItemNotFound.webp";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
function ItemNotFound() {
  return (
    <div className={styles.centerImg}>
      <img src={itemNotFoundImg} alt="ItemNotFound" />
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}

export default ItemNotFound;
