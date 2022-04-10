import React, { useEffect, useState } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Coin from './component/Coin';
import AddCoin from './component/AddCoin';
import CoinGecko from './api/CoinGecko/CoinGecko';
import Banner from './component/Banner';import { useDispatch } from 'react-redux';
;

const getVisibleCoins = () => {
  if(localStorage.getItem('coins')){
    return JSON.parse(localStorage.getItem('coins'));
  }
  else{
    const initialCoins = ["bitcoin", "ethereum", "cardano"];
    localStorage.setItem('coins', JSON.stringify(initialCoins));
    return initialCoins
  }
};


function App() {


  const [coinData, setCoinData] = useState([]);
  const [trackedCoins, setTrackedCoins] = useState([]);


  const fetchData = async (initialCoins) => {
    if(initialCoins.length > 0){
    const response = await CoinGecko.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        ids: initialCoins.join(',')
      },
    });
    
    setCoinData(response.data);
  }
  };

  useEffect(() => {
    const initialCoins = getVisibleCoins(); 
    setTrackedCoins(initialCoins);

    fetchData(initialCoins);
  }, []);


  useEffect(() => {

    if (trackedCoins.length !== 0) {
      fetchData(trackedCoins);
    }
    localStorage.setItem('coins', JSON.stringify(trackedCoins));
  }, [trackedCoins]);




  const removeCoin = (coin) => {

    const newVisibleCoins = trackedCoins.filter(c => coin !== c );
    setTrackedCoins(newVisibleCoins);
    setCoinData(coinData.filter(c => c.id !== coin));

    localStorage.setItem('coins', JSON.stringify(newVisibleCoins));
  }

  const addCoin = (coin) => {
    setTrackedCoins(trackedCoins => [...trackedCoins, coin]);
  }

  return (
    <div className="App">      
        
        <Banner/>
        <AddCoin addCoin={addCoin} trackedCoins={trackedCoins}/>
        <div className="Coin-container">
          {coinData.map(coin => <Coin coin={coin} removeCoin={removeCoin}></Coin>)}
        </div>   
    </div>
  );
}

export default App;
