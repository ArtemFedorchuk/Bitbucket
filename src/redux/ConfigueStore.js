import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import weatherReducer from "./WeatherDataStore";

// Combine reducers
const reducer = combineReducers({
  weather: weatherReducer
});

// Create Store equivalent
const store = configureStore({
  reducer,
  // We don't use thunk
  middleware: [...getDefaultMiddleware({ thunk: false })]
});

export default store;