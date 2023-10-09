import axios, { AxiosRequestConfig } from 'axios';

interface RequestHeaders {
  Authorization: string;
  [key: string]: string;
}

const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json, application/vnd.api+json',
    'Content-Type': 'application/json',
  },
  baseURL:"https://api.newsmuncher.com/api"
});



export { axiosInstance };
