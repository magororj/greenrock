import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import withContext from '../withContext';
const URL_COINGECKO = "https://api.coingecko.com/api/v3/coins/";

const HistoryChart = props => {
    let idcart= [];
    let [market, setMarket] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const coinKeys = Object.values(props.cart);
    let Data = {};


    const fetchData = async (idcart) => {
        setIsLoading(true);
        for(let i in idcart){
          console.log(idcart[i]);
        let response = await axios.get(URL_COINGECKO +`${idcart[i]}/market_chart/`, {
          params: {
            vs_currency:"brl",
            days:"7",
            interval: "daily"
        },
      });
                  Data.name = response.data.id;
                  Data.data = response.data.prices;
                    setMarket(Data);
                    console.log(response);
                    
                
                            } 
                            console.log(market);
             setIsLoading(false);
    }


useEffect(() => {
    for(let item in coinKeys){
        idcart.push(coinKeys[item].coin.id); 
        fetchData(idcart);
      } 
      //console.log(idcart);
    
    
}, [props.cart])

    Data = [
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