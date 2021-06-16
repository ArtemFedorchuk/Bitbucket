import React, { useEffect } from 'react';
import { Axios } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEY, LAT, LON } from '../../constants';
import { Row } from 'reactstrap';
import { DateFormater } from '../../helpers';
import { MySpinner } from '../index';
import styles from './styles.module.scss';
import {setHistoricalWeather} from '../../redux/WeatherDataStore';
import { DateTime } from 'luxon'

const HistoricalWeather = () => {
  const dispatch = useDispatch();
  const historicalWeather = useSelector((state) => state.weather.historicalWeather);

  console.log('historicalWeather ->> ', historicalWeather)

  useEffect(() => {
    let arrDate = Array(5)
      .fill(0)
      .map((date, inx) => DateTime.utc().minus({ days: (inx + 1) }).toSeconds().toFixed(0))

    const fetchHistoricalWeather = async (date) => {
      const response = await Axios.get(
        `onecall/timemachine?lat=${LAT}&lon=${LON}&dt=${date}&appid=${API_KEY}`,
        {
          headers: {'Content-Type': 'application/json'}
        }
      );
      return response.data
    };

    const getDatesHistory = async () => {
      try {
        let weatherArr = [];
        for(let date of arrDate) {
          await fetchHistoricalWeather(date).then(res => {
            weatherArr.push(res)
          })
        }
        dispatch(setHistoricalWeather(weatherArr))

      }catch (e) {
        console.log(e)
      }
    }

    getDatesHistory()
  }, [dispatch]);

  return (
    <div className={styles.currentBlock}>
      <h5>Historical weather 5 days</h5>
      <div>
        <h6>Timezone: {historicalWeather?.[0]?.timezone}</h6>
        <div className={styles.minutelyHeader}>
          <p>time:</p>
          <p>temp:</p>
        </div>
        {
          historicalWeather ? historicalWeather?.map(({current}, idx) => (
              <Row key={idx}>
                <div className={styles.row}>
                  <div className={styles.time}>
                    {DateFormater(current.dt, "Asia/Kolkata")}
                  </div>
                  <p className={styles.weather}>
                    {Number(current?.temp).toFixed(1)} F
                  </p>
                </div>
              </Row>
            )) :
            (<MySpinner />)
        }
      </div>
    </div>
  )
};

export default HistoricalWeather;
