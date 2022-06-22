import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({ chartData, pieTitle }) => {
  return (
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        radius: '65%',

        plugins: {
          legend: {
            labels: {
              font: {
                style: 'italic',
                weight: '600',
                size: 15,
              },
            },
            position: 'bottom',
          },
          title: {
            display: true,
            text: pieTitle,
            font: {
              size: 17,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            display: false,
          },

          y: {
            grid: {
              display: false,
            },
            display: false,
          },
        },
      }}
    ></Doughnut>
  );
};

export default PieChart;
