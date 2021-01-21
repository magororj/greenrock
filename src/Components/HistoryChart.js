import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import withContext from '../withContext';

const HistoryChart = props => {
    const idcart= Object.values(props.cart)[0].coin.id;
    const [market, setMarket] = useState({});
    const [isLoading, setIsLoading] = useState(false);
   
useEffect(() => {
   
    const fetchData = async () => {
        setIsLoading(true);
        await axios.get(`https://api.coingecko.com/api/v3/coins/${idcart}/market_chart/`, 
        {params: {
            vs_currency:"brl",
            days:"7",
            interval: "daily"
        },})
                  .then(market => {
                                setMarket({market});
                                console.log(market.data);
                                
                                })
                  .catch(error => console.log(error));
                  setIsLoading(false);
    }

    fetchData(); 
    console.log(props.cartKeys);
    console.log(idcart);
}, [props.cartKeys])

 
const Data = [
    {"name":"BitCoin","data":{"2013-02-10":3,"2013-02-17":3,"2013-02-24":3,"2013-03-03":1,"2013-03-10":4,"2013-03-17":3,"2013-03-24":2,"2013-03-31":3}},
    {"name":"Ethereum","data":{"2013-02-10":0,"2013-02-17":0,"2013-02-24":0,"2013-03-03":0,"2013-03-10":2,"2013-03-17":1,"2013-03-24":0,"2013-03-31":0}},
    {"name":"Tether","data":{"2013-02-10":0,"2013-02-17":1,"2013-02-24":0,"2013-03-03":0,"2013-03-10":0,"2013-03-17":1,"2013-03-24":0,"2013-03-31":1}}
  ];
    return (
        <div>
            <h1>History Chart</h1>
            {isLoading ? (<div className="is-align-content-center"> Loading...</div>) :
            ( <LineChart data={Data} height="200px" curve={false} download={true}/> )} 
        </div>
    )
}

export default withContext(HistoryChart);