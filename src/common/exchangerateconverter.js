import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExchangeRate } from '../store/actions/exchangeRateConverterAction';

const ExchangeRateConverter = () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const rate = useSelector((state) => state.exchangeRateConverter.rate);
  const rateSuccess = useSelector((state) => state.exchangeRateConverter.success);
  const rateFailure = useSelector((state) => state.exchangeRateConverter.error);


  useEffect(() => {
    if(rateSuccess){
      setExchangeRate(rate);
      console.log(rate);
    }
  }, [rate, rateSuccess]);

  useEffect(() => {
    if(exchangeRate){
      const result = amount * exchangeRate;
      setConvertedAmount(result.toFixed(4));
    }
  }, [exchangeRate, amount]);

  useEffect(() => {
    console.log(rateFailure);
  }, [rateFailure]);

  const handleAmountChange = (e) => {
    setExchangeRate(0);
    setConvertedAmount(null);
    const value = e.target.value;
    if (!isNaN(value)) {
      setAmount(value);
      setError('');
    } else {
      setError('Please enter a valid number');
    }
  };

  const handleConvert = () => {
    if (amount === '') {
      setError('Please enter a valid amount');
      return;
    }
    dispatch(fetchExchangeRate(toCurrency,fromCurrency));
    
  };

  return (
    <div className="h-full">
      <h2 className="ml-6 mt-4 text-2xl font-semibold mb-4">Exchange Coins</h2>
      <div className="flex justify-between mb-4">
        <div className="flex-shrink">
        <div className="flex items-center ml-6 mt-4">
        <label htmlFor="toCurrency" className="mr-2 font-medium text-orange-500">Sell</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className=" w-4/5  px-6 py-2 ml-4 bg-gray-100 border rounded-md ">
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="litecoin">Litecoin</option>
            {/* Add more cryptocurrencies here */}
          </select>
          </div>
          <div className="flex items-center ml-6 mt-2">
        <label htmlFor="fromCurrency" className="mr-2 font-medium text-green-500">Buy</label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-4/5 px-6 py-2 ml-4 bg-gray-100 border rounded-md mt-2 ">
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            {/* Add more national currencies here */}
          </select>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className=" w-1/2 px-2 py-2 mr-8 mt-4 border rounded-md mb-2 "
            placeholder="Enter amount"
          />
          {error && <p className="text-red-500 mt-1">{error}</p>}
          <p className="font-semibold text-green-500 mt-3 mr-6">{convertedAmount}</p>
        </div>
      </div>
      <div className="text-center">
        <button className=" w-1/4  px-3 py-2 bg-blue-600 text-white rounded-md" onClick={handleConvert}>Exchange</button>
      </div>
    </div>
  );
  
  
};

export default ExchangeRateConverter;

