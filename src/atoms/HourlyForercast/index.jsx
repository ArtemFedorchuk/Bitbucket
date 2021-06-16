import React, { useEffect } from 'react';
import { Row } from 'reactstrap';
import { DateFormater } from '../../helpers';
import { MySpinner } from '../index';
import { Axios } from '../../api';
import { API_KEY, LAT, LON } from '../../constants';
import { setHourlyWeather } from '../../redux/WeatherDataStore';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';

const HourlyForercast = () => {
  const dispatch = useDispatch();
  const hourlyWeather = useSelector((state) => state.weather.hourlyWeather);

  useEffect(() => {
    try {
      const fetchHourlyWeather = async () => {
        const response = await Axios.get(
          `onecall?lat=${LAT}&lon=${LON}&exclude=current,minutely,daily,alerts&appid=${API_KEY}`,
          {
            headers: {'Content-Type': 'application/json'}
          }
        );

        if(response.status === 200) {
          dispatch(setHourlyWeather(response.data))
        }
      };

      fetchHourlyWeather()
    }catch (e) {
      console.log(e)
    }
  }, [dispatch]);

  return (
    <div className={styles.currentBlock}>
      <h5>Hourly forecast for 48 hours</h5>
      <div>
        <h6>Timezone: {hourlyWeather?.timezone}</h6>
        <div className={styles.minutelyHeader}>
          <p>time:</p>
          <p>temp:</p>
        </div>
        {
          hourlyWeather?.hourly ? hourlyWeather?.hourly.map(({dt, temp}) => (
              <Row key={dt}>
                <div className={styles.row}>
                  <div className={styles.time}>
                    {DateFormater(dt, "Asia/Kolkata")}
                  </div>
                  <p className={styles.temperature}>{Math.floor(temp)} F</p>
                </div>
              </Row>
            )) :
            (<MySpinner />)
        }
      </div>
    </div>
  )
};

export default HourlyForercast;
