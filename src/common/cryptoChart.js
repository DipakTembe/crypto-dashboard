import React, { useEffect, useState } from 'react';
import TimeButtons from './timebuttons'
import { Line } from 'react-chartjs-2';

import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketChartData } from '../store/actions/marketChartAction';
// import { Doughnut } from "react-chartjs-2";

// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const CryptoChartDiv = () => {
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Line Chart',
  //     },
  //   },
  // };

  const dispatch = useDispatch();
  const [marketData1, setMarketData1] = useState([]);
  const [marketLabel, setMarketLabel] = useState([]);
  const apiChartData = useSelector((state) => state.marketChart.chartData);
  const chartCurrency = useSelector((state) => state.marketChart.chartCurrency);
  useEffect(() => {
    dispatch(fetchMarketChartData(chartCurrency,365));
  }, [chartCurrency]);

  useEffect(() => {
    if(apiChartData){
      console.log(apiChartData);
      setMarketData1(apiChartData.map(item => item[1]));
      setMarketLabel(apiChartData.map((item,index) => (index)));
    }
  }, [apiChartData]);



  const options = {
    maintainAspectRatio: false, // Set to false to make the chart responsive
    plugins: {
      legend: {
        align: "end",
        labels:{
          usePointStyle: true,
          pointStyle: "circle",
          pointStyleWidth:7,
          boxHeight:5
        }
      }
    },
    scales: {
      x: {
          grid: {
              display: false
          }
      },
      y: {
          grid: {
              display: true
          },
          beginAtZero: true,
          
          ticks: {
            callback: function(value, index, values) {
                if (value >= 1000) {
                    return value / 1000 + 'k'; // Divide value by 1000 and append 'k' for 10k increments
                } else {
                    return value; // Show default for values below 1000
                }
            }
        },
       
      }
  }
  };
  
  const labels = marketLabel;
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Bitcoin',
        data: marketData1,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)', 
      },
      // {
      //   label: 'Dataset 2',
      //   data: [1000, 700, 756,400,256,876,435],
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };
  

  return (
    <>
      <TimeButtons/>
      <div className=" sm:h-64">
        <Line options={options} data={data} />
      </div>
      
    </>
  );
};

export default CryptoChartDiv;
