import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinsList } from '../store/actions/coinActions';
import { fetchMarketChartData } from '../store/actions/marketChartAction';

const TimeButtons = ({ onIntervalChange }) => {
  const [isCryptoOpen, setIsCryptoOpen] = useState(false);
  const [isCoinListOpen, setIsCoinListOpen] = useState(false);
  const [chartCurrency, setChartCurrency] = useState(null);
  const [chartType, setChartType] = useState('Chart Type');

  const dispatch = useDispatch();
  const coinsList = useSelector((state) => state.coin.coins);
  const selectedChartCurrency = useSelector((state) => state.marketChart.chartCurrency);

  useEffect(() => {
    dispatch(fetchCoinsList());
  }, [dispatch]);

  useEffect(() => {
    if (coinsList.length) {
      setChartCurrency(coinsList[0].name);
    }
  }, [coinsList]);

  const toggleCryptoDropdown = () => setIsCryptoOpen(!isCryptoOpen);
  const toggleCoinListDropdown = () => setIsCoinListOpen(!isCoinListOpen);

  const handleClick = (interval) => {
    if (onIntervalChange) onIntervalChange(interval);
    dispatch(fetchMarketChartData(selectedChartCurrency, interval));
  };

  const handleCurrencyChange = (coin) => {
    setChartCurrency(coin.name);
    dispatch(fetchMarketChartData(coin.name, '365'));
    setIsCoinListOpen(false);
  };

  return (
    <div className="pt-4">
      <div className="flex flex-wrap gap-2 text-sm justify-center md:justify-between">
        {/* Interval Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {['1', '7', '30', '180', '365'].map((interval) => (
            <button
              key={interval}
              className="px-3 py-1 bg-gray-100 border rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors"
              onClick={() => handleClick(interval)}
            >
              {interval === '1' ? '1D' : interval === '7' ? '1W' : interval === '30' ? '1M' : interval === '180' ? '6M' : '1Y'}
            </button>
          ))}
        </div>

        {/* Dropdowns */}
        <div className="flex gap-2 flex-wrap justify-center">
          {/* Coin List */}
          <div className="relative">
            <button
              onClick={toggleCoinListDropdown}
              className="flex items-center px-3 py-1 bg-gray-100 border rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {chartCurrency}
              <HiChevronDown className={`ml-1 ${isCoinListOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>
            {isCoinListOpen && (
              <div className="absolute top-full left-0 bg-white border shadow-md z-10 w-40">
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

          {/* Chart Type */}
          <div className="relative">
            <button
              onClick={toggleCryptoDropdown}
              className="flex items-center px-3 py-1 bg-gray-100 border rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              {chartType}
              <HiChevronDown className={`ml-1 ${isCryptoOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>
            {isCryptoOpen && (
              <div className="absolute top-full left-0 bg-white border shadow-md z-10 w-40">
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setChartType('Line Chart')}
                  >
                    Line Chart
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeButtons;
