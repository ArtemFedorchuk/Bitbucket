import axios from 'axios';
import { BASE_URL } from '../constants';

const instance = axios.create({
  baseURL: BASE_URL,
  // responseType: 'json',
  timeout: 3000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export const Axios = instance;
