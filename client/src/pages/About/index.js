import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import "./style.css";

const About = () => {
  return (
    <Fragment>
      <div
        className="full-plant-bg display-grid-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`,
        }}>
          
        <div className="d-flex flex-column flex-wrap justify-content-start">
          <div className="display-grid-center">
            <h1 className="text-white mt-5 mb-2">About Muskmelon</h1>
          </div>

          <div className="d-flex flex-row flex-wrap justify-content-center">
            <div className="card about-paragraph p-3 m-1">
              <h3>Introduction</h3>
              <p>
                Muskmelon is a platform for plant enthusiasts. Its main
                functionality is to allow users to share posts with
                descriptions, and images of their plants so that other users can
                then like, save and comment.{" "}
              </p>
            </div>
            <div className="card about-paragraph p-3 m-1">
              <h3>Purpose</h3>
              <p>
                Over time users can like and save posts for inspiration, share
                fruits of their own labor, and build a community fostering
                appreciation for the growing of plants.
              </p>
            </div>
            <div className="card about-paragraph p-3 m-1">
              <h3>Technology Stack</h3>
              <code>Front-end</code>
              <p>
                We used a combination of React, various react packages and
                Bootstrap for our front-end.{" "}
              </p>
              <code>Back-end</code>
              <p>
                For our back-end we used Node.js and Express.js alongside
                PostgreSQL for our database.
              </p>
            </div>
            <div className="card about-paragraph p-3 m-1">
              <h3>Creators</h3>
              <p>Muskmelon is brought to you by:</p>
              <ul className="creator-list">
                <li>
                  <a href="https://github.com/phyeony"> Hyeonyoung Park</a>
                </li>
                <li>
                  <a href="https://github.com/cxtruong70"> Calvin Truong</a>
                </li>
                <li>
                  <a href="https://github.com/zwemsoe"> Zwe Min Soe</a>
                </li>
                <li>
                  <a href="https://github.com/ACimensel"> Artun Cimensel</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
