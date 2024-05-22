/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../../ui/StarRating";
import {
  discountedPrice,
  formatPrice,
  truncateDescription,
} from "../../util/helper";
import styles from "./ProductItem.module.css";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addItem } from "../cart/cartSlice";
// import { useAuth } from "../../Context/AuthContext";
function ProductItem({ item }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  // const { isAuthenticated } = useAuth();

  const isInCart = cart.find((items) => items.itemId === item.id);
  const navigate = useNavigate();
  const unitPrice = discountedPrice(item.price, item.discountPercentage);

  function handleAddCart() {
    const newItem = {
      itemId: item.id,
      name: item.title,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
      img: item.thumbnail,
      desc: item.description,
    };
    if (isInCart) {
      toast.error("Already in cart");
    } else {
      dispatch(addItem(newItem));
      toast.success(`${item.title} Added to cart successfully`);
    }
  }

  function handleGoToCart() {
    navigate("/cart");
  }
  return (
    <>
      <div className={styles.card}>
        <Link className={styles.links} to={`/product/${item.id}`}>
          <div>
            <div className={styles.category}>
              {item.category || <Skeleton />}
            </div>
            <img className={styles.img} src={item.thumbnail} alt="flag" />

            <div className={styles.details}>
              <h3>{truncateDescription(item.title, 2)}</h3>

              <p className={styles.itemDesc}>
                {truncateDescription(item.description, 8)}
              </p>
              {/* <p className={styles.itemPrice}>
              <span>$</span>
              {item.price}
              
            </p> */}

              <div className={styles.price}>
                <span className={styles.oldPrice}>
                  {formatPrice(item?.price)}
                </span>
                <span className={styles.newPrice}>
                  {formatPrice(
                    discountedPrice(item.price, item.discountPercentage)
                  )}
                </span>
                {/* <span className={`${styles.discount} ${styles.fw6}`}>
                ({item?.discountPercentage}% Off)
              </span> */}
              </div>
              <StarRating
                maxRating={5} // Optional: Maximum rating, default is 5
                defaultRating={item.rating} // Optional: Default rating, default is 0
                color="#fcc419" // Optional: Color of the stars, default is "#fcc419"
                size={18} // Optional: Size of the stars, default is 48
              />
            </div>
          </div>
        </Link>
        {isInCart ? (
          <div onClick={handleGoToCart} className={styles.goToCart}>
            <p>Go to Cart</p>
          </div>
        ) : (
          <div onClick={handleAddCart} className={styles.addtocart}>
            <p>Add to Cart</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductItem;
