import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BengaluruPage, CityesPage} from './pages';

function App() {
  const auth = true;
  const protectedRoute = (Component) => {
    return auth  ? Component : (<Redirect to="/" />)
  };
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ () =>  <BengaluruPage/>} />} />
        {protectedRoute(<Route path="/cities-weather" render={ () =>  <CityesPage/>} />)}
        <Route render={ () => <h1>404 page!</h1>} />
      </Switch>
    </div>
  );
}

export default App;
