import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { DateFormater } from '../../helpers';
import { MySpinner } from '../index';

const WeatherChart = () => {
  const [ data, setData ] = useState(null)
  const chartData = useSelector((state) => state.weather.chartData);

  useEffect(() => {
    const customData = {
      options: {
        title: {
          text: chartData && `${chartData?.timezone} (temp F)`,
          style: {
            fontSize:  '14px',
            fontWeight:  'bold',
            color:  '#263238',
          },
          label: {
            color: 'red'
          }
        },
        chart: {
          id: 'chart',
        },
        xaxis: {
          categories: chartData &&
            chartData?.hourly?.slice(0, 25).map(({dt}) => DateFormater(dt, "Asia/Kolkata"))
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            dataLabels: {
              position: 'center', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return Number(val).toFixed(0) + "F";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["white"],
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 1,
            color: '#000',
            opacity: 0.35
          }
        },
      },
      series: [{
        name: 'temp F',
        data: chartData &&
          chartData?.hourly?.slice(0, 25).map(({temp}) => temp)
      }],
    }

    const clear = setTimeout(() => {
      setData(customData)
    }, 400)

    return () => clearTimeout(clear)
  }, [chartData])

  return (
    <div>
      {data ? (
        <Chart options={data?.options} series={data?.series} type="bar" width='100%' height={600} />
      ): (<MySpinner />)}
    </div>
  );
};

export default WeatherChart;