import React from "react";

const CartItem = props => {
    const { cartItem, cartKey } = props;

    const { coin } = cartItem;
    return (
        <div className=" column is-half">
            <div className="box">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                        <img src={coin.image} alt='crypto' />
                        </figure>
                    </div>
                    <div className="media-content">
                        <b style={{ textTransform: "capitalize"}}>
                            {coin.name}{" "}
                            <span className="tag is-primary">$ {coin.current_price}</span>
                        </b>
                        <div>{coin.shortDesc}</div>
                        
                    </div>
                    <div
                        className="media-right"
                        onClick={() => props.removeFromCart(cartKey)}
                        >
                            <span className="delete is-large"></span>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;