import { Fragment } from "react";

const NullPost = () => {
    return (
        <Fragment>
            <div className="card w-100">
                <div className = "card-body text-center">
                    <p className = "card-title">No Posts Yet</p>
                </div>
            </div>
        </Fragment>
    );
};

export default NullPost;
