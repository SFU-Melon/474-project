import { useState, useEffect, Fragment } from "react";
import { useUserContext } from "@contexts/UserContext";
import Utility from "@utils";

const Following = (props) => {
  const { user } = useUserContext();
  const [yearsAgo, setYearsAgo] = useState(0);
  const [monthsAgo, setMonthsAgo] = useState(0);
  const [daysAgo, setDaysAgo] = useState(0);
  const [displayDate, setDisplayText] = useState("");

  const handleProps = () => {
    const date1 = new Date();
    const date2 = new Date(props?.person.joindate);
    var timeDiff = Utility.diffTime(date1, date2);
    setDaysAgo(timeDiff[0]);
    setMonthsAgo(timeDiff[1]);
    setYearsAgo(timeDiff[2]);
  };

  const handleDisplayDate = () => {
    if (yearsAgo > 1) {
      setDisplayText(
        "Joined in " + new Date(props?.person.joindate).getFullYear() + ""
      );
    } else if (monthsAgo > 1) {
      setDisplayText(
        "Joined in " +
          Utility.monthNames[new Date(props?.person.joindate).getMonth()] +
          ""
      );
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
                className="small-profile-pic-dim rounded m-0"
                alt="User Profile Pic"
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
            <p>{displayDate}</p>
          </div>
        </div>
      </a>
    </Fragment>
  );
};

export default Following;
