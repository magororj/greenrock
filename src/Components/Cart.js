import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem";
import HistoryChart from "./HistoryChart";
import './Cart.css';

const Cart = props => {
  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});
  return(
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Coins Selected </h4>
        </div>
      </div>
      <br/>
      <div className="container historychart">
        { cartKeys.length ? (
        <HistoryChart
          cart = {cart}
          cartKeys={cartKeys}
        />
        ) : ( null )}
        
      </div>
      <div className="container">
        { cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
                />
            ))}
        <div className="column is-12 is-clearfix">
          <br/>
          <div className="is-pulled-right">
            <button
              onClick={props.context.clearCart}
              className="button is-warning">
                Clear selection
              </button>{" "}
              <button
                onClick={props.context.checkout}
                className="button is-success">
                  Nothing to do here for now..
                </button>
          </div>
        </div>
      </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No Coins selected.</div>
          </div>
        )}
        </div>
    </>
  );
};

export default withContext(Cart);