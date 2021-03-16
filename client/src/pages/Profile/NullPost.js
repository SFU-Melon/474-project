import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";


const NullPost = () => {
    const { user } = useUserContext();

    return (
        <Fragment>
            <div className="card w-100">
                <div className = "card-body text-center">
                    <p className = "card-title">No Posts Yet</p>
                    {/* <h6 className = "card-subtitle">No posts yet</h6> */}
                </div>
            </div>
        </Fragment>
    );
};

export default NullPost;
