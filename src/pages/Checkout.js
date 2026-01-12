import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";
import "../styles/cart.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalAmount = Number(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );


  if (items.length === 0) {
    return <h3 className="empty-cart">Your cart is empty</h3>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.thumbnail} alt={item.title} />

          <div className="cart-details">
            <h4>{item.title}</h4>
            <p>Price: ₹ {item.price}</p>

            <div className="quantity-controls">
              <button onClick={() => dispatch(decreaseQuantity(item.id))} disabled={item.quantity <= 1}>
                −
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(addToCart(item))}>
                +
              </button>
            </div>

            <p className="item-total">
              Total: ₹ {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <button
            className="remove-btn"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            ✕
          </button>
        </div>
      ))}

      <div className="checkout-footer">
        <h3>Total Amount: ₹ {totalAmount}</h3>
        <button className="clear-btn" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;
