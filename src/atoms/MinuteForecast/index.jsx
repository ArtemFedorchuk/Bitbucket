import React, {useEffect} from 'react';
import { Axios } from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import { API_KEY, LAT, LON } from '../../constants';
import { Row } from 'reactstrap';
import { DateFormater } from '../../helpers';
import { MySpinner } from '../../atoms';
import styles from './styles.module.scss';
import {setMinuteWeather} from '../../redux/WeatherDataStore';

const MinuteForecust = () => {
  const dispatch = useDispatch();
  const minuteWeather = useSelector((state) => state.weather.minuteWeather);

  useEffect(() => {
    try {
      const fetchMinuteWeather = async () => {
        const response = await Axios.get(
          `onecall?lat=${LAT}&lon=${LON}&exclude=current,hourly,daily,alerts&appid=${API_KEY}`,
          {
            headers: {'Content-Type': 'application/json'}
          }
        );
        dispatch(setMinuteWeather(response.data))
      };

      fetchMinuteWeather()
    } catch (e) {
      console.log(e)
    }
  }, [dispatch]);

  return (
    <div className={styles.currentBlock}>
      <h5>Minute forecast 1 hour</h5>
      <div>
        <h6>Timezone: {minuteWeather?.timezone}</h6>
        <div className={styles.minutelyHeader}>
          <p>time:</p>
          <p>mm:</p>
        </div>
        {
          minuteWeather?.minutely ? minuteWeather?.minutely.map(({dt, precipitation}) => (
            <Row key={dt}>
              <div className={styles.row}>
                <div className={styles.time}>
                  {DateFormater(dt, "Asia/Kolkata")}
                </div>
                {precipitation === 0 ? (
                  <p className={styles.mm}>0</p>
                ) :
                ( <p className={styles.mm}>{Number(precipitation).toFixed(1)}</p>)}
              </div>
            </Row>
          )) :
            (<MySpinner />)
        }
      </div>
    </div>
  )
};

export default MinuteForecust;
