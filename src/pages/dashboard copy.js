import React, { useEffect, useState } from 'react'
import Header from '../layout/header'
import Card from '../common/card'
import { HiChevronDown } from 'react-icons/hi';
// import LineChart from '../common/linechart';
import LineChartExample from '../common/linechart';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCoins } from '../store/actions/coinActions';


const Dashboard = () => {



  const [isOpen, setIsOpen] = useState(false);
  const [ basePrice, setBasePrice] = useState("usd");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coin.coins);
  const loading = useSelector((state) => state.coin.loading);
  const error = useSelector((state) => state.coin.error);

  useEffect(() => {
    // dispatch(fetchCoins(basePrice));
  }, [dispatch, basePrice]);

  if (loading) return <div>Loading...</div>;
  

  return (
    
    <>
      <div className="min-h-screen">
        <Header/>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 h-full">
          <div className="bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="grid grid-rows-4 grid-flow-col gap-4">
                
                  <div className="grid grid-cols-5 gap-4">
                    <div className="flex-auto">
                    <Card>
                      <div className="relative w-full min-w-8">
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center w-full px-2 py-2
                        text-gray-700 rounded-md focus:outline-none focus:bg-gray-100"
                      >
                        {basePrice}
                        <HiChevronDown className={`ml-2 ${isOpen ? 'transform rotate-180' : ''}`} />
                      </button>
                        {isOpen && (
                          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md">
                            <ul>
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>{setBasePrice("usd")}}>USD</li>
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>{setBasePrice("inr")}}>INR</li>
                              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>{setBasePrice("eur")}}>EURO</li>
                            </ul>
                          </div>
                        )}
                      </div>
                      </Card>
                    </div>
                    <div className="flex-auto col-span-4">
                      <Card/>
                    </div>
                  </div>
                  <div className="">
                  <Card>
                    <>
                      <p className=""></p>
                      <LineChartExample/>
                    </>

                  </Card>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className=""><Card/></div>
                    <div className=""><Card/></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {/* Cryptocurrency by market cap Card */}
                  <Card header="Top 10 Coins">
                  {error && <div>Error: {error}</div>}
                  {!error && 
                  <ul>
                    {coins?.map((coin) => (
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
    </>
    
  )
}

export default Dashboard;