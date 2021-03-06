import React, { Fragment, useState } from "react";

const LikeDislike = () =>{

    return <Fragment>
        <p>user.username</p>
        <div>
            <button className = "btn btn-success">Like</button>
            <button className = "btn btn-danger">Dislike</button>
        </div>
    </Fragment>;
};

export default LikeDislike;