import React, {useState} from "react";
import CoinsItem from "./CoinsItem";
import withContext from "../withContext";
import  "./CoinsSearch.css";

const CoinsSearch = props => {
    const { coins } = props.context;
    const [search, setSearch] = useState('');


    const handleChange = e => {
      setSearch(e.target.value);
    };
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  

    return (
      <>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">Search Coins</h4>
            <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="column columns is-multiline">
          
            {filteredCoins && filteredCoins.length ? (
              filteredCoins.map((coin, index) => (
               <CoinsItem
                  coin={coin}
                  key={index}
                  addToCart={props.context.addToCart}
                />
              ))
            ) : (
              <div className="column">
                <span className="title has-text-grey-light">
                No coins found
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default withContext(CoinsSearch);
