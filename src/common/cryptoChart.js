import React, { useEffect, useState } from 'react';
import TimeButtons from './timebuttons';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketChartData } from '../store/actions/marketChartAction';

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
  const dispatch = useDispatch();
  const [marketData1, setMarketData1] = useState([]);
  const [marketLabel, setMarketLabel] = useState([]);

  const apiChartData = useSelector((state) => state.marketChart.chartData);
  const chartCurrency = useSelector((state) => state.marketChart.chartCurrency);

  // ✅ Fix: Added dispatch to dependency array
  useEffect(() => {
    dispatch(fetchMarketChartData(chartCurrency, 365));
  }, [dispatch, chartCurrency]);

  // ✅ This effect remains the same
  useEffect(() => {
    if (apiChartData) {
      console.log(apiChartData);
      setMarketData1(apiChartData.map((item) => item[1]));
      setMarketLabel(apiChartData.map((item, index) => index));
    }
  }, [apiChartData]);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          pointStyleWidth: 7,
          boxHeight: 5,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value >= 1000 ? value / 1000 + 'k' : value;
          },
        },
      },
    },
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
    ],
  };

  return (
    <>
      <TimeButtons />
      <div className="sm:h-64">
        <Line options={options} data={data} />
      </div>
    </>
  );
};

export default CryptoChartDiv;
