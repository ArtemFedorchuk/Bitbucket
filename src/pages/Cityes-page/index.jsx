import React from 'react';
import {Container} from 'reactstrap';
import { Header } from '../../molecules';
import SearchField from '../../atoms/SearchField';

const CityesPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <h1>Search cities weather.</h1>
        <SearchField />
      </Container>
    </div>
  );
};

export default CityesPage;
