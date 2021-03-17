import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

const Following = (props) => {
    const [monthsAgo, setMonthsAgo] = useState("");
    const [daysAgo, setDaysAgo] = useState("");
    const [displayDate, setDisplayText] = useState("");

    const handleProps = () => {
        console.log(props);
        setMonthsAgo(new Date().getMonth() - new Date(props.person.joindate).getMonth());
        setDaysAgo(new Date().getDay() - new Date(props.person.joindate).getDay());
    }

    const handleDisplayDate = () => {
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
        handleDisplayDate();
    }, [])

    return (
        <Fragment>
            <Link style={{ textDecoration: 'none', color:'black' }} to={`/user/${props.person.username}`}>
                <div className="d-flex flex-row mb-2">
                    <div className ="w-25 m-0">
                        <div className ="w-75">
                        <img className="img-fluid rounded m-0" 
                            src={props.person?.profilephoto ? props.person.profilephoto 
                            : "/null-user.png" }>
                        </img>
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
