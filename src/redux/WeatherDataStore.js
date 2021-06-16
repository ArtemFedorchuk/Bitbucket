import { createSlice } from "@reduxjs/toolkit";

// Create Slice combine the actions, initialState, and reducer into 1 function
const WeatherStore = createSlice({
  name: "weather",
  initialState: {
    chartData: [],
    currentWeather: [],
    minuteWeather: [],
    hourlyWeather: [],
    dailyWeather: [],
    historicalWeather: [],
    value: 0,
  },
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },

    setMinuteWeather: (state, action) => {
      state.minuteWeather = action.payload;
    },

    setHourlyWeather: (state, action) => {
      state.hourlyWeather = action.payload;
    },

    setDailyWeather: (state, action) => {
      state.dailyWeather = action.payload;
    },

    setHistoricalWeather: (state, action) => {
      state.historicalWeather = action.payload;
    },

    // Action setDataChart
    setDataChart: (state, action) => {
      state.chartData = action.payload;
    },
  }
});

// Export actions
export const {
  setDataChart,
  setMinuteWeather,
  setCurrentWeather,
  setHourlyWeather,
  setDailyWeather,
  setHistoricalWeather
} = WeatherStore.actions;

// Export reducer
export default WeatherStore.reducer;