import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinsList } from '../store/actions/coinActions';
import { fetchMarketChartData } from '../store/actions/marketChartAction';


const TimeButtons = ({ onIntervalChange }) => {

  const [isCryptoOpen, setIsCryptoOpen] = useState(false);
  const [isCoinListOpen, setIsCoinListOpen] = useState(false);
  const [chartCurrency, setChartCurrency] = useState(null);
  const [chartType, setChartType] = useState("Chart Type");

  const dispatch = useDispatch();
  const coinsList = useSelector((state) => state.coin.coins);
  const selectedChartCurrency = useSelector((state) => state.marketChart.chartCurrency);
  useEffect(() => {
    dispatch(fetchCoinsList());
  }, []);

  useEffect(() => {
    if (coinsList.length) {
      setChartCurrency(coinsList[0]["name"]);
    }
  }, [coinsList]);

  const toggleCryptoDropdown = () => {
    setIsCryptoOpen(!isCryptoOpen);
  };
  const toggleCoinListDropdown = () => {
    setIsCoinListOpen(!isCoinListOpen);
  };

  const handleClick = (interval) => {
    if (onIntervalChange) {
      onIntervalChange(interval);
    }
      dispatch(fetchMarketChartData(selectedChartCurrency, interval));
  };


  return (
    <div className="pt-4">
      <div className="flex  text-sm">
        <div className="flex-1">
          <div className="flex justify-center">
            <button
              className="mr-2 px-4 py-1 bg-gray-100 border border-gray-100 rounded-lg transition-colors hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"
              onClick={() => handleClick('1')}
            >
              1D
            </button>
            <button
              className="mr-2 px-4 bg-gray-100 border border-gray-100 rounded-lg transition-colors hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"
              onClick={() => handleClick('7')}
            >
              1W
            </button>
            <button
              className="mr-2 px-4 bg-gray-100 border border-gray-100 rounded-lg transition-colors hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"
              onClick={() => handleClick('30')}
            >
              1M
            </button>
            <button
              className="mr-2 px-4 bg-gray-100 border border-gray-100 rounded-lg transition-colors hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"
              onClick={() => handleClick('180')}
            >
              6M
            </button>
            <button
              className="mr-2 px-4 bg-gray-100 border border-gray-100 rounded-lg transition-colors hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"
              onClick={() => handleClick('365')}
            >
              1Y
            </button>
          </div>
        </div>
        <div className="flex-none">
          <div className="flex">
            <div className="relative flex-none">
              <button
                onClick={toggleCoinListDropdown}
                className="flex items-center mr-2 px-4 py-1 bg-gray-100 border border-gray-100 rounded-lg transition-colors
                          hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"

              >
                {chartCurrency}
                <HiChevronDown className={`ml-2 ${isCoinListOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isCoinListOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-md">
                  <ul>

                    {coinsList?.map((coin) => (
                      <li key={coin.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setChartCurrency(coin.name) }}>
                        {coin.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative flex-none">
              <button
                onClick={toggleCryptoDropdown}
                className="flex items-center mr-2 px-4 py-1 bg-gray-100 border border-gray-100 rounded-lg transition-colors
                         hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"

              >
                {chartType}
                <HiChevronDown className={`ml-2 ${isCryptoOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isCryptoOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-md">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setChartType("Line Chart") }}>Line Chart</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeButtons;
