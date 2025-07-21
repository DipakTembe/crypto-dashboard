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

  // ✅ Fixed missing `dispatch` dependency
  useEffect(() => {
    dispatch(fetchCoinsList());
  }, [dispatch]);

  useEffect(() => {
    if (coinsList.length) {
      setChartCurrency(coinsList[0].name);
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

  const handleCurrencyChange = (coin) => {
    setChartCurrency(coin.name);
    dispatch(fetchMarketChartData(coin.name, '365')); // Fetch new data for selected coin
    setIsCoinListOpen(false);
  };

  return (
    <div className="pt-4">
      <div className="flex text-sm">
        <div className="flex-1">
          <div className="flex justify-center">
            {['1', '7', '30', '180', '365'].map((interval) => (
              <button
                key={interval}
                className="mr-2 px-4 py-1 bg-gray-100 border border-gray-100 rounded-lg transition-colors hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"
                onClick={() => handleClick(interval)}
              >
                {interval === '1' ? '1D' : interval === '7' ? '1W' : interval === '30' ? '1M' : interval === '180' ? '6M' : '1Y'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-none">
          <div className="flex">
            {/* Coin List Dropdown */}
            <div className="relative flex-none">
              <button
                onClick={toggleCoinListDropdown}
                className="flex items-center mr-2 px-4 py-1 bg-gray-100 border border-gray-100 rounded-lg transition-colors
                          hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"
              >
                {chartCurrency}
                <HiChevronDown className={`ml-2 transition-transform ${isCoinListOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCoinListOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-md z-10">
                  <ul>
                    {coinsList.map((coin) => (
                      <li
                        key={coin.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCurrencyChange(coin)}
                      >
                        {coin.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Chart Type Dropdown */}
            <div className="relative flex-none">
              <button
                onClick={toggleCryptoDropdown}
                className="flex items-center mr-2 px-4 py-1 bg-gray-100 border border-gray-100 rounded-lg transition-colors
                         hover:bg-blue-100 hover:text-blue-700 hover:border-2 hover:border-blue-600"
              >
                {chartType}
                <HiChevronDown className={`ml-2 transition-transform ${isCryptoOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCryptoOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-md z-10">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setChartType("Line Chart")}>
                      Line Chart
                    </li>
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
