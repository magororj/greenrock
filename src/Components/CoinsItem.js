import React from "react";

const CoinsItem = props => {
  const { coin } = props;
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
              <span className="tag is-primary">R$ {coin.current_price.toFixed(2)}</span>
            </b>
            <div>{coin.shortDesc}</div>
           
            <div className="is-clearfix">
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: coin.name,
                    coin
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