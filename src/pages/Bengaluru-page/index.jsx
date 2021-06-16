import React from 'react';
import { Col, Row } from 'reactstrap';
import { Header } from '../../molecules';
import {
  CurrentWeather,
  MinuteForecast,
  HourlyForercast,
  DailyForecast,
  HistoricalWeather
} from '../../atoms';

const BengaluruPage = () => {
  return (
    <div>
      <Header />
      <Row>
        <Col><CurrentWeather /></Col>
        <Col><MinuteForecast /></Col>
        <Col><HourlyForercast /></Col>
        <Col><DailyForecast /></Col>
        <Col><HistoricalWeather /></Col>
      </Row>
    </div>
  );
};

export default BengaluruPage;
