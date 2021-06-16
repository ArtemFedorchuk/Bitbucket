import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { Axios } from '../../api';
import {API_KEY, LAT, LON} from '../../constants';
import {setDataChart} from '../../redux/WeatherDataStore';
import { WeatherChart } from '../../atoms';


const SearchField = () => {
  const [inpText, setInpText] = useState('');
  const dispatch = useDispatch();

  const SearchHandler = () => {
    const days = 16;
    try {
      const fetchSixteenWeather = async () => {
        const response = await Axios.get(`forecast/daily?q=${inpText}&cnt=${days}&appid=${API_KEY}`);
        dispatch(setDataChart(response.data))
      };

      fetchSixteenWeather()
    }catch (e) {
      console.log(e)
    }
  }

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
          dispatch(setDataChart(response.data))
        }
      };

      fetchHourlyWeather()
    }catch (e) {
      console.log(e)
    }
  }, [dispatch]);

  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button onClick={SearchHandler} color="success">Search city</Button>
        </InputGroupAddon>
        <Input onChange={e => setInpText(e.target.value)}/>
      </InputGroup>
      <br/>
      <WeatherChart />
    </div>
  );
};

export default SearchField;