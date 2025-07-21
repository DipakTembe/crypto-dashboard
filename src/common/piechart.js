import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function PieChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(myChartRef, {
      type: 'pie',
      data: {
        labels: ['Tether', 'Luna', 'Ethereum'],
        datasets: [{
          data: [250, 375, 375],
          backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(0, 168, 107)'],
        }]
      },
      options: {
        responsive: true,   // ✅ Make chart responsive
        maintainAspectRatio: false,  // ✅ Allow height control
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              pointStyleWidth: 12,
              boxHeight: 8
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || '';
                return `${label}: $${value}`;
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96 mx-auto">
      <div className="absolute top-0 right-0 mr-4 text-right">
        <h2 className="font-bold text-gray-300">Total value</h2>
        <h2 className="font-bold">$1000</h2>
      </div>
      <h2 className="font-bold mb-2">Portfolio</h2>
      <div className="w-full h-full">
        <canvas ref={chartRef} className="w-full h-full" aria-label="Portfolio Pie Chart" />
      </div>
    </div>
  );
}
