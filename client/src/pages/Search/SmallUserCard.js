import { useState, useEffect, Fragment } from "react";
import { useUserContext } from "@contexts/UserContext";
import { Link } from "react-router-dom";

import "./smallusercard.css";

const SmallUserCard = (props) => {
  const { user } = useUserContext();

  return (
    <Fragment>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={
          user?.id === props.person.userId
            ? `/profile/${user?.id}`
            : `/profile/public/${props.person.userId}`
        }
      >
        <div
          className="display-grid-center"
          style={{
            border: "1px solid rgba(0,0,0,.125)",
          }}
        >
          <div className="row">
            <div className="col" style={{ paddingLeft: "0" }}>
              <img
                className="rounded small-user-img"
                alt="User Profile Pic"
                src={
                  props.person?.profilephoto
                    ? props.person.profilephoto
                    : "/null-user.png"
                }
              ></img>
            </div>
            <div className="col display-grid-center">
              <p className="small-user-name">{props.person.userId}</p>
            </div>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

export default SmallUserCard;
