import React, { useEffect, Fragment, useState } from "react";
import "./style.css";

const About = () => {
  return (
    <Fragment>
      <div
        className="full-plant-bg display-grid-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/plant-bg.png"})`,
        }}
      >
        <div className="d-flex flex-column flex-wrap justify-content-start">
          <div className="display-grid-center">
            <h1 className="text-white mt-5 mb-2">About Educational Q&A</h1>
          </div>

          <div className="d-flex flex-row flex-wrap justify-content-center">
            <div className="card about-paragraph p-3 m-1">
              <h3>Introduction</h3>
              <p>
                Educational Q&A is a platform for education. Its main
                functionality is to allow users to share posts with
                questions, and images of their questions so that other users can
                then like, save, and answer.{" "}
              </p>
            </div>
            <div className="card about-paragraph p-3 m-1">
              <h3>Purpose</h3>
              <p>
                Over time users can like and save posts for inspiration, share
                fruits of their own knowledge, and build a community fostering
                appreciation for sharing the knowledge.
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
                For our back-end we used AWS serverless lambda in both Node.js and Python alongside
                DynamoDB for our database.
              </p>
            </div>
            <div className="card about-paragraph p-3 m-1">
              <h3>Creators</h3>
              <p>Educational Q&A is brought to you by:</p>
              <ul className="creator-list">
                <li>
                  <a href=""> Hyeonyoung</a>
                </li>
                <li>
                  <a href=""> Vy</a>
                </li>
                <li>
                  <a href=""> Rick</a>
                </li>
                <li>
                  <a href=""> Serena</a>
                </li>
                <li>
                  <a href=""> Vj</a>
                </li>
              </ul>
              <h3>Original Creators</h3>
              <p>This project was made by:</p>
              <ul className="creator-list">
                <li>
                  <a href=""> Zwe</a>
                </li>
                <li>
                  <a href=""> Calvin</a>
                </li>
                <li>
                  <a href=""> Artun</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="display-grid-center">
          <div className="row">
            <div className="col">
              <a
                href="https://github.com/SFU-Melon/474-project/"
                target="_blank"
                className="btn btn-dark"
              >
                Github
              </a>
            </div>
            <div className="col">
              <a
                href="https://github.com/SFU-Melon/474-project/issues"
                target="_blank"
                className="btn btn-danger"
                style={{ width: "9rem" }}
              >
                Report for bugs
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
