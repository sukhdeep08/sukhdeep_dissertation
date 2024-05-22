import { useState } from "react";
import "./CheckoutProcess.css"; // Import CSS file for styling
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../cart/cartSlice";

function CheckoutProcess() {
  //   const cart = useState((state) => state.cart.cart);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [shippingInfo, setShippingInfo] = useState({ name: "", address: "" });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  //   const handleCartUpdate = (item) => {
  //     // Update the cart
  //     setCart([...cart, item]);
  //   };

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.address) {
      alert("Please enter both name and address for shipping information.");
      return;
    }

    if (
      !paymentInfo.cardNumber ||
      !paymentInfo.expiryDate ||
      !paymentInfo.cvv
    ) {
      alert("Please enter all payment information fields.");
      return;
    }
    dispatch(clearCart());
    setIsSubmitted(true);
  };

  return (
    <div className="checkout-container">
      <h1>Checkout Process</h1>
      {!isSubmitted ? (
        <>
          <div className="section">
            <h2>Review Your Cart</h2>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.totalPrice}
                </li>
              ))}
            </ul>
          </div>
          <div className="section">
            <h2>Enter Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleShippingInfoChange}
                />
              </label>
              <br />
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                />
              </label>
              <br />
            </form>
          </div>
          <div className="section">
            <h2>Enter Payment Information</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentInfoChange}
                />
              </label>
              <br />
              <label>
                Expiry Date:
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentInfoChange}
                />
              </label>
              <br />
              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentInfoChange}
                />
              </label>
              <br />
              <button className="submit-button" type="submit">
                Place Order
              </button>
            </form>
          </div>
        </>
      ) : (
        <div>
          <h2>Thank you for your order!</h2>
          <p>Your order has been placed successfully.</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutProcess;
