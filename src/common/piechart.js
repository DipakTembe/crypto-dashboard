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
          data: [250, 375, 375], // Updated data values
          backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(0, 168, 107)'],
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true, // Use point style for legend items
              pointStyleWidth: 12,
              boxHeight: 8
            }
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                let label = data.labels[tooltipItem.index] || '';
                if (label) {
                  label += ': $' + tooltipItem.value; // Append $ before the value
                }
                return label;
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
    <div className="relative w-64 h-full mx-auto">
      
      <h2 className="font-bold absolute top-0 right-0 mr-4">
        <span className="text-gray-300">Total value</span> $1000
      </h2>
      <h2 className="font-bold ">Portfolio</h2>
      <canvas ref={chartRef} className="w-full h-full" aria-label="Portfolio Pie Chart" />
    </div>
  );
  
}
