import axios from "axios";
import { Auth } from 'aws-amplify';

axios.defaults.baseURL = process.env.REACT_APP_API_GATEWAY_BASE_URL ?? "http://localhost:5000/"

export const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    config.headers['Authorization'] = `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`;
    return config;
  },
  error => {
    Promise.reject(error)
});
