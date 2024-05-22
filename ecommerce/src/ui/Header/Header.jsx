import style from "./Header.module.css";
import headIcon from "../../images/headIcon.png";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../features/Search/Search";
import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../../features/user/userSlice";
import { formatPrice } from "../../util/helper";
import { useAuth } from "../../Context/AuthContext";
import { useAccounts } from "../../Context/AccountsContext";
import { clearCart } from "../../features/cart/cartSlice";
// import Filter from "../../features/Filter/Filter";

function Header() {
  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const { currAcc } = useAccounts();
  const dispatch = useDispatch();
  // const name = useSelector((state) => state.user.name);s
  // const image = useSelector((state) => state.user.image);
  const { isAuthenticated, setAuthenticated } = useAuth();

  const cartLength = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const total = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
  );
  function handlLogOut() {
    setAuthenticated(false);
    navigate("/signin");
    dispatch(clearCart());
  }
  return (
    <>
      <div className={style.header}>
        <div className={style.icon}>
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth", // Smooth scroll behavior
              });
            }}
          >
            <img className={style.img} src={headIcon} alt="" />
          </Link>
          {/* <h3>ShopWorld</h3> */}
          <div className={style.searchHide}>
            <Search />
          </div>
          {/* <div className={style.filterHide}>
            <Filter />
          </div> */}
        </div>

        {/* <Filter /> */}
        <div className={`${style.cartContainer} ${style.cartflex}`}>
          <div className={style.usericon}>
            {isAuthenticated && (
              <div className={style.flex}>
                <p>Welcome </p>
                <span>{currAcc.name}</span>
              </div>
            )}
          </div>
          <div onClick={handlLogOut} className={style.logoutIcon}>
            {isAuthenticated && <ion-icon name="log-out-outline"></ion-icon>}
            {isAuthenticated ? <p>Logout</p> : <p>Sign In</p>}
          </div>
          <Link to="/cart" className={style.cartContainer}>
            {cart.length === 0 ? (
              <ion-icon name="cart-outline"></ion-icon>
            ) : (
              <ion-icon name="cart"></ion-icon>
            )}
            {cartLength ? (
              <div className={style.cartNumber}>{cartLength}</div>
            ) : null}
            {cart.length === 0 ? <p>Cart</p> : <p>{formatPrice(total)}</p>}
          </Link>
        </div>
      </div>
      <div className={style.searchShow + " " + style.searchHeader}>
        <Search />
      </div>
    </>
  );
}

export default Header;
//
