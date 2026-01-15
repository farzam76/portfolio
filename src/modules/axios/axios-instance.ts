import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json, application/vnd.api+json',
    'Content-Type': 'application/json',
  },
  baseURL:"https://api.newsmuncher.com/api"
});



export { axiosInstance };
