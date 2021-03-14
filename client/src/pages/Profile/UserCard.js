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
    // const [daysAgo, setDaysAgo] = useState("");
    console.log(props);

    const handleProps = () =>{
        console.log(props);
        setDateJoined(new Date(props.person.joindate).toDateString());
        setMonthsAgo(new Date().getMonth() - new Date(props.person.joindate).getMonth());
        setDaysAgo(new Date().getDay() - new Date(props.person.joindate).getDay());
    }

    useEffect(() => {
        handleProps();
    }, [])

    return (
        <Fragment>
            <Link to={`/user/${props.person.id}`}>
                <div className="d-flex flex-row">
                    <div className ="w-25 m-2">
                        {/* <div className ="w-75"> */}
                        <img className="img-fluid rounded" src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"></img>
                        {/* </div> */}
                    </div>
                    <div className ="w-100 m-2">
                        <h6>{props.person.username}</h6>
                        { daysAgo <= 1 ? <p className="followCardText"><em className="followCardText">Joined today</em></p> : <p><em className="followCardText">Joined {daysAgo} days ago</em></p>}
                    </div>
                </div>
            </Link>
        </Fragment>
    );
};

export default Following;
