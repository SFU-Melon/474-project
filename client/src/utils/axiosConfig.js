import axios from "axios";
import { Auth } from 'aws-amplify';

axios.defaults.baseURL = process.env.REACT_APP_API_GATEWAY_BASE_URL ?? "http://localhost:5000/"

export const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    try{
      const currentSession = await Auth.currentSession();
      console.log("SESS", currentSession)
      if(currentSession) {
        config.headers['Authorization'] = `Bearer ${currentSession.getAccessToken().getJwtToken()}`;
      }
    } catch(e) {
      console.error("current session does not exist", e) 
    }
    return config;
  },
  error => {
    Promise.reject(error)
});
