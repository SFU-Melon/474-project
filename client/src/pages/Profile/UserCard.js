import { useState, useEffect, Fragment } from "react";
import { useUserContext } from "../../contexts/UserContext";

const Following = (props) => {
  const { user } = useUserContext();
  const [monthsAgo, setMonthsAgo] = useState(0);
  const [daysAgo, setDaysAgo] = useState(0);
  const [displayDate, setDisplayText] = useState("");

  const handleProps = () => {
    const date1 = new Date();
    const date2 = new Date(props?.person.joindate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30)); 
    setDaysAgo(diffDays);
    setMonthsAgo(diffMonths);
  };

  const handleDisplayDate = () => {
    if (monthsAgo > 1) {
      setDisplayText("Joined " + monthsAgo + " months ago");
    } else if (daysAgo > 1) {
      setDisplayText("Joined " + daysAgo + " days ago");
    } else {
      setDisplayText("Joined today");
    }
  };

  useEffect(() => {
    handleProps();
    handleDisplayDate();
  });

  return (
    <Fragment>
      <a
        style={{ textDecoration: "none", color: "black" }}
        href={
          user?.id === props.person.id
            ? `/profile/${user?.username}`
            : `/profile/public/${props.person.username}`
        }
      >
        <div className="d-flex flex-row mb-2">
          <div className="w-25 m-0">
            <div className="w-75">
              <img
                className="img-fluid rounded m-0"
                src={
                  props.person?.profilephoto
                    ? props.person.profilephoto
                    : "/null-user.png"
                }
              ></img>
            </div>
          </div>
          <div className="w-75 m-0">
            <h6 className="m-0">{props.person.username}</h6>
            <p>
              <em>{displayDate}</em>
            </p>
          </div>
        </div>
      </a>
    </Fragment>
  );
  
};

export default Following;
