import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import UserCard from "./UserCard"

const Following = (props) => {
    // const { user } = useUserContext();
    const [dateJoined, setDateJoined] = useState("");
    const [monthsAgo, setMonthsAgo] = useState("");
    const [daysAgo, setDaysAgo] = useState("");
    const [displayDate, setDisplayText] = useState("");
    console.log(props);

    const handleProps = () => {
        console.log(props);
        setDateJoined(new Date(props.person.joindate).toDateString());
        setMonthsAgo(new Date().getMonth() - new Date(props.person.joindate).getMonth());
        setDaysAgo(new Date().getDay() - new Date(props.person.joindate).getDay());
    }

    const handleDisplayText = () => {
        if (monthsAgo >= 2){
            setDisplayText("Joined " + monthsAgo + " months ago");
        } else if (daysAgo >= 2){
            setDisplayText("Joined " + monthsAgo + " days ago");
        } else{
            setDisplayText("Joined today");
        }
    }

    useEffect(() => {
        handleProps();
        handleDisplayText();
    }, [])

    return (
        <Fragment>
            <Link style={{ textDecoration: 'none', color:'black' }} to={`/user/${props.person.username}`}>
                <div className="d-flex flex-row mb-2">
                    <div className ="w-25 m-0">
                        <div className ="w-75">
                        <img className="img-fluid rounded m-0" src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"></img>
                        </div>
                    </div>
                    <div className ="w-75 m-0">
                        <h6 className="m-0">{props.person.username}</h6>
                        <p><em>{displayDate}</em></p>
                    </div>
                </div>
            </Link>
        </Fragment>
    );
};

export default Following;
