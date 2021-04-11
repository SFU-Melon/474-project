import axios from "axios";
import React, { useEffect, Fragment, useState } from "react";
import { useUserContext } from "@contexts/UserContext";
import Utility from "@utils/index.js";
import useLocalStorage from "@hooks/useLocalStorage";
import ScreenLoading from "@components/ScreenLoading";


const About = () => {

  return (
    <Fragment>
        <div className = "m-2 p-3">
            <h3>About</h3>
        </div>
    </Fragment>
  );
};

export default About;
