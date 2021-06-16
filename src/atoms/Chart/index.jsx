import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { DateFormater } from '../../helpers';
import { MySpinner } from '../index';

const WeatherChart = () => {
  const chartData = useSelector((state) => state.weather.chartData);

  const data = {
    options: {
      title: {
        text: chartData && `${chartData?.timezone} (temp F)`,
        style: {
          fontSize:  '14px',
          fontWeight:  'bold',
          color:  '#263238'
        },
      },
      chart: {
        id: 'chart',
      },
      xaxis: {
        categories: chartData &&
          chartData?.hourly?.slice(0, 25).map(({dt}) => DateFormater(dt, "Asia/Kolkata"))
      }
    },
    series: [{
      name: 'temp F',
      data: chartData &&
        chartData?.hourly?.slice(0, 25).map(({temp}) => temp)
    }]
  }

  return (
    <div>
      {chartData ? (
        <Chart options={data?.options} series={data?.series} type="bar" width='100%' height={600} />
      ): (<MySpinner/>)}
    </div>
  );
};

export default WeatherChart;