import { useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Utility from "../../utils";

// Components
import Vote from "../../components/Vote";

const Post = () => {
  const { user } = useUserContext();
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const decoded = Utility.decodeUUID(id);

  const fetchPost = async () => {
    const res = await axios.get(`/api/getPost/${decoded}`);
    setPost(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  return (
    <Fragment>
      {post && (
        <div className="container">
          <h1>{post.title}</h1>
          <p>{post.imageurl}</p>
        </div>
      )}
    </Fragment>
  );
};

export default Post;
