import React, { Fragment, useState } from "react";
import axios from 'axios';

const LikeDislike = ({ id, user }) =>{

    const handleUpVote = async (e) => {
        console.log(user.id);
        axios
            .post(`/api/upVotePost/${user.id}`, { postId: id })
            .then((res) => {
            console.log(res);
        });
    };

    const handleDownVote = async (e) => {
        axios
            .post(`/api/downVotePost/${user.id}`, { postId: id })
            .then((res) => {
            console.log(res);
        });
    };

    return <Fragment>
        <p>user.username</p>
        <div>
            <button className = "btn btn-success" onClick={() => handleUpVote()}>Like</button>
            <button className = "btn btn-danger" onClick={() => handleDownVote()}>Dislike</button>
        </div>
    </Fragment>;
};

export default LikeDislike;