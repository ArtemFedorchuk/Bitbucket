import React, { useEffect } from 'react';
import { Axios } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEY, LAT, LON } from '../../constants';
import { Row } from 'reactstrap';
import { DateFormater } from '../../helpers';
import { MySpinner } from '../index';
import styles from './styles.module.scss';
import {setHistoricalWeather} from '../../redux/WeatherDataStore';

const HistoricalWeather = () => {
  const dispatch = useDispatch();
  const historicalWeather = useSelector((state) => state.weather.historicalWeather);

  useEffect(() => {
    const currentDate = Math.floor(Date. now() / 1000);

    const fetchHistoricalWeather = async () => {
      const response = await Axios.get(
        `onecall/timemachine?lat=${LAT}&lon=${LON}&dt=${currentDate}&appid=${API_KEY}`,
        {
          headers: {'Content-Type': 'application/json'}
        }
      );

      dispatch(setHistoricalWeather(response.data))
    };

    fetchHistoricalWeather()
  }, [dispatch]);

  return (
    <div className={styles.currentBlock}>
      <h5>Historical weather 7 days</h5>
      <div>
        <h6>Timezone: {historicalWeather?.timezone}</h6>
        <div className={styles.minutelyHeader}>
          <p>time:</p>
          <p>weather:</p>
        </div>
        {
          historicalWeather?.hourly ? historicalWeather?.hourly.map(({dt, weather}) => (
              <Row key={dt}>
                <div className={styles.row}>
                  <div className={styles.time}>
                    {DateFormater(dt, "Asia/Kolkata")}
                  </div>
                  <p className={styles.weather}>{weather?.[0].main}</p>
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
