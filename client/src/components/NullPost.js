import { Fragment } from "react";

const NullPost = (props) => {
  return (
    <Fragment>
      <div className="card w-100">
        <div className="card-body text-center">
          <p className="card-title">
            No {props.custom ? props.custom : "Posts"} Yet
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default NullPost;
