import React, { useEffect, useState } from 'react'
import Header from '../layout/header'
import Card from '../common/card'
import { HiChevronDown } from 'react-icons/hi';
// import LineChart from '../common/linechart';
import CryptoChartDiv from '../common/cryptoChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinsMarketData } from '../store/actions/coinActions';
import PieChart from '../common/piechart';
import ExchangeRateConverter from '../common/exchangerateconverter';
import { setChartCurrency } from '../store/actions/marketChartAction';

const Dashboard = () => {



  const [isOpen, setIsOpen] = useState(false);
  const [basePrice, setBasePrice] = useState("usd");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const coinsMarketData = useSelector((state) => state.coin.coinsMarketData);
  const loading = useSelector((state) => state.coin.loading);
  const error = useSelector((state) => state.coin.error);

  useEffect(() => {
    // dispatch(fetchCoinsMarketData(basePrice));
    dispatch(setChartCurrency(basePrice));
  }, [dispatch, basePrice]);


  

  if (loading) return <div>Loading...</div>;


  return (
    <div className="min-h-screen">
      {/* <Header/> */}
      <div className="flex">
        <div className="flex-grow flex flex-wrap content-start bg-gray-100">

          <div className="h-screen w-full px-2 lg:w-2/3">
            <div className=" flex-grow flex flex-wrap h-full pb-2">
              <div className="rounded-lg bg-card w-full h-full flex flex-col">


                <div className=" flex w-full sm:flex py-2 items-end">

                  <div className="relative flex-none">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center w-full px-2 py-2 bg-white
                        text-gray-700 rounded-md"
                    >
                      {basePrice}
                      <HiChevronDown className={`ml-2 ${isOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md">
                        <ul>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setBasePrice("USD") }}>USD</li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setBasePrice("INR") }}>INR</li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setBasePrice("EUR") }}>EURO</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 justify-between ps-2">

                    <form action="#" method="POST">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        className="py-2 block w-full rounded-lg border-gray-300 bg-card"
                        placeholder="  search by coin"
                      />
                    </form>
                    {/* <IconButton icon="res-react-dash-sidebar-open" className="block sm:hidden" onClick={onSidebarHide} /> */}
                  </div>

                </div>

                <div className="w-full flex-1 bg-white pt-3 pb-6 px-6">
                  <div className="rounded-lg h-full space-y-6">
                    {/* <Graph /> */}

                    <CryptoChartDiv/>

                  </div>
                </div>
                <div className="flex flex-wrap mt-2">
                  <div className="w-full md:w-1/2 ">
                    <div className="rounded-lg mx-1 bg-card sm:h-auto">
                      <Card>
                        <PieChart />
                      </Card>

                    </div>

                  </div>

                  <div className="w-full md:w-1/2">
                      <div className="rounded-lg mx-1 bg-card sm:h-full">
                        <Card>
                         <ExchangeRateConverter />
                        </Card>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
          <div className="lg:h-screen px-2 lg:w-1/3 w-full">
            <div className="rounded-lg py-2 h-full">
              {/* <TopCountries /> */}
              {/* Cryptocurrency by market cap Card */}
              <Card className="h-full" header="Top 10 Coins">
                {error && <div>Error: {error}</div>}
                {!error &&
                  <ul>
                    {coinsMarketData?.map((coin) => (
                      <li key={coin.id}>
                        <div>
                          {coin.name}
                        </div>
                        <div>
                          Mkt Price: {coin.current_price}
                        </div>
                      </li>

                    ))}
                  </ul>
                }
              </Card>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;