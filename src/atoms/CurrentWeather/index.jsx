import React, {useEffect} from 'react';
import { Axios } from '../../api';
import { useDispatch, useSelector } from "react-redux";
import { API_KEY, CITY } from '../../constants';
import styles from './styles.module.scss';
import { MySpinner } from '../../atoms';
import { setCurrentWeather } from "../../redux/WeatherDataStore";


const CurrentWeather = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((state) => state.weather.currentWeather);

  useEffect(() => {
    try {
      const fetchCurrentWeather = async () => {
        const response = await Axios.get(`weather?q=${CITY}&mode=html&appid=${API_KEY}`);
        dispatch(setCurrentWeather(response.data))
      };

      fetchCurrentWeather()
    }catch (e) {
      console.log(e)
    }
  }, [dispatch]);

  return (
    <div className={styles.currentBlock}>
      <h5>Current weather</h5>
      {currentWeather ? (
        <div dangerouslySetInnerHTML={{ __html: currentWeather }}/>
      ): (
        <MySpinner color="dark"/>
      )}
    </div>
  );
};

export default CurrentWeather;
