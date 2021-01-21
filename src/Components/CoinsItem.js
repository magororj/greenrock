import React from "react";

const CoinsItem = props => {
  const { coin } = props;
  console.log(coin);
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
            <b style={{ textTransform: "capitalize" }}>
              {coin.name}{" "}
              <span className="tag is-primary">${coin.current_price}</span>
            </b>
            <div>{coin.shortDesc}</div>
           
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: coin.name,
                    coin,
                    amount: 1
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinsItem;