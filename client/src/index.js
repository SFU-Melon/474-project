import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify, Auth } from 'aws-amplify';


// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
      region: process.env.REACT_APP_AWS_REGION ?? "",
      userPoolId: process.env.REACT_APP_AWS_USER_POOL_ID ?? "",
      userPoolWebClientId: process.env.REACT_APP_AWS_USER_POOL_APP_CLIENT_ID ?? "",
  },
  // API: {
  //   endpoints: [
  //     {
  //       name: "apiGatewayApi",
  //       endpoint: process.env.REACT_APP_API_GATEWAY_BASE_URL ?? "http://localhost:5000/",
  //       custom_header: async () => {
  //         return { Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
  //       }
  //     }
  //   ]
  // }
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
