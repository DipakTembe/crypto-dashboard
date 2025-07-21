import React, { useEffect, useState } from 'react';
import Header from '../layout/header';
import Card from '../common/card';
import { HiChevronDown } from 'react-icons/hi';
import CryptoChartDiv from '../common/cryptoChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinsMarketData } from '../store/actions/coinActions';
import PieChart from '../common/piechart';
import ExchangeRateConverter from '../common/exchangerateconverter';
import { setChartCurrency } from '../store/actions/marketChartAction';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [basePrice, setBasePrice] = useState('usd');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const coinsMarketData = useSelector((state) => state.coin.coinsMarketData);
  const loading = useSelector((state) => state.coin.loading);
  const error = useSelector((state) => state.coin.error);

  useEffect(() => {
    dispatch(fetchCoinsMarketData(basePrice));
    dispatch(setChartCurrency(basePrice));
  }, [dispatch, basePrice]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col lg:flex-row">
        <div className="flex-grow flex flex-col bg-gray-100 w-full lg:w-2/3 p-2">
          <div className="flex flex-col h-full">
            <div className="rounded-lg bg-card flex flex-col flex-grow">
              <div className="flex flex-col md:flex-row w-full py-2 items-end gap-2 px-2">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center px-2 py-2 bg-white text-gray-700 rounded-md w-32 justify-between"
                  >
                    {basePrice}
                    <HiChevronDown className={`ml-2 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute top-full left-0 w-32 bg-white border border-gray-300 shadow-md z-10">
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setBasePrice('USD')}>USD</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setBasePrice('INR')}>INR</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setBasePrice('EUR')}>EURO</li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full py-2 px-2 rounded-lg border border-gray-300 bg-card"
                    placeholder="Search by coin"
                  />
                </div>
              </div>

              <div className="w-full flex-1 bg-white pt-3 pb-6 px-2">
                <div className="rounded-lg h-full space-y-6">
                  <CryptoChartDiv />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 mt-2 px-2 pb-2">
                <div className="w-full md:w-1/2">
                  <div className="rounded-lg bg-card h-full">
                    <Card>
                      <PieChart />
                    </Card>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="rounded-lg bg-card h-full">
                    <Card>
                      <ExchangeRateConverter />
                    </Card>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 p-2">
          <div className="rounded-lg bg-card h-full">
            <Card header="Top 10 Coins">
              {error && <div>Error: {error}</div>}
              {!error &&
                <ul className="space-y-2">
                  {coinsMarketData?.map((coin) => (
                    <li key={coin.id} className="border-b pb-1">
                      <div>{coin.name}</div>
                      <div className="text-gray-600 text-sm">Mkt Price: {coin.current_price}</div>
                    </li>
                  ))}
                </ul>
              }
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
