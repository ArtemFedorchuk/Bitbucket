import React, { useEffect } from 'react';
import { Axios } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEY, LAT, LON } from '../../constants';
import { Row } from 'reactstrap';
import { DateFormater } from '../../helpers';
import { MySpinner } from '../index';
import { setDailyWeather } from '../../redux/WeatherDataStore';
import styles from './styles.module.scss';

const DailyForecast = () => {
  const dispatch = useDispatch();
  const deilyWeather = useSelector((state) => state.weather.dailyWeather);

  useEffect(() => {
    try {
      const fetchDailyWeather = async () => {
        const response = await Axios.get(
          `onecall?lat=${LAT}&lon=${LON}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`,
          {
            headers: {'Content-Type': 'application/json'}
          }
        );
        dispatch(setDailyWeather(response.data))
      };

      fetchDailyWeather()
    }catch (e) {
      console.log(e)
    }
  }, [dispatch]);

  return (
    <div className={styles.currentBlock}>
      <h5>Daily forecast for 7 days</h5>
      <div>
        <h6>Timezone: {deilyWeather?.timezone}</h6>
        <div className={styles.minutelyHeader}>
          <p>time:</p>
          <p>weather:</p>
        </div>
        {
          deilyWeather?.daily ? deilyWeather?.daily.map(({dt, weather}) => (
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

export default DailyForecast;
