/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderBtn from "../../ui/OrderBtn/OrderBtn";
import styles from "./CartOverview.module.css";
import {
  clearCart,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "./cartSlice";
import { formatPrice } from "../../util/helper";
import toast from "react-hot-toast";
import backgroundImg from "../../images/bck.png";
import emptycart from "../../images/emptycart.png";
import { Link, useNavigate } from "react-router-dom";

function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
  );
  const cartLength = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [ordplaced, setordplaced] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let timeoutId;
    if (ordplaced) {
      timeoutId = setTimeout(() => {
        setordplaced(false);

        navigate("/");
      }, 10000);
      dispatch(clearCart());
    }
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ordplaced, dispatch, navigate]);

  function handlechk() {
    navigate("/checkout");
  }

  return (
    <>
      <div className={styles.orderplaced}>{ordplaced && <OrderBtn />}</div>
      <div
        style={{ backgroundImage: `url(${backgroundImg})` }}
        className={styles.wrapper}
      >
        <div className={styles.bckcolor}></div>
        <div className={styles.container}>
          <div className={styles.cartCard}>
            {cart.map((item) => (
              <CartCard key={item.itemId} item={item} />
            ))}
            {cartLength === 0 && (
              <img
                className={styles.emptyCart}
                src={emptycart}
                alt="emptyCart"
              />
            )}
          </div>

          <div className={styles.checkOut}>
            <div className={styles.checkOutCard}>
              <h1>Cart totals</h1>
              <div className={styles.subtotal}>
                <p>SUBTOTAL</p>
                <span>{formatPrice(total)}</span>
              </div>
              <div className={styles.total}>
                <p>TOTAL</p>
                <span className={styles.bold}>{formatPrice(total)}</span>
              </div>

              {cartLength === 0 ? (
                <Link to="/">
                  <button disabled={ordplaced} className={styles.chkoutBtn}>
                    Shop our products
                  </button>
                </Link>
              ) : (
                <button
                  onClick={handlechk}
                  disabled={ordplaced}
                  className={styles.chkoutBtn}
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {cartLength === 0 ? (
        <Link to="/">
          <button disabled={ordplaced} className={styles.chkoutBtnbtm}>
            Shop our products
          </button>
        </Link>
      ) : (
        <button
          onClick={handlechk}
          disabled={ordplaced}
          className={styles.chkoutBtnbtm}
        >
          Proceed to Checkout
        </button>
      )}
    </>
  );
}

export default CartOverview;

function CartCard({ item }) {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(deleteItem(item.itemId));
    toast.success(`${item.name} removed successfully`);
  }

  function handleInc() {
    dispatch(increaseItemQuantity(item.itemId));
  }
  function handleDec() {
    if (item.quantity > 1) dispatch(decreaseItemQuantity(item.itemId));
    else {
      toast.error("Item quantity cannot be less than 1");
    }
  }
  return (
    <div className={styles.card}>
      <div onClick={handleRemove} className={styles.close}>
        <ion-icon size="large" name="close-sharp"></ion-icon>
      </div>
      <div className={styles.cardImage}>
        <img className={styles.images} src={item.img} alt="" />
      </div>
      <div className={styles.cardDetails}>
        <h1>{item.name}</h1>
        <p className={styles.gray}>{item.desc}</p>
        <div className={styles.quantity}>
          <p>Qty: </p>
          <div className={styles.qtyWrapper}>
            <span onClick={handleDec} className={styles.minus}>
              <ion-icon name="remove-sharp"></ion-icon>
            </span>
            <span className={styles.num}>{item.quantity}</span>
            <span onClick={handleInc} className={styles.plus}>
              <ion-icon name="add-sharp"></ion-icon>
            </span>
          </div>
          <p className={styles.unitPrice}>{formatPrice(item.unitPrice)}</p>
          <p className={styles.totalPrice}>{formatPrice(item.totalPrice)}</p>
        </div>
      </div>
    </div>
  );
}
