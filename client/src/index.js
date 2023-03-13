import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { Amplify } from 'aws-amplify';

axios.defaults.baseURL = process.env.REACT_APP_API_GATEWAY_BASE_URL ?? "http://localhost:5000/"

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
      region: process.env.REACT_APP_AWS_REGION ?? "",
      userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID ?? "",
      userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_APP_CLIENT_ID ?? ""
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
