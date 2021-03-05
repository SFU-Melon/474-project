import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import ImageUpload from "../../components/ImageUpload";
import { useState } from "react";

export default function Home() {
  const id = 4;
  const { user } = useUserContext();
  const [imgUrl, setImgUrl] = useState(null);

  const uploadCallback = (url) => {
    console.log(url);
    setImgUrl(url);
  };

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <ImageUpload type={"post"} uploadCallback={uploadCallback} />
          {imgUrl && (
            <img src={imgUrl} alt="uploaded" width="700" height="700"></img>
          )}
        </div>
      )}
      <Link to={`/post/${id}`}>POST - {id}</Link>
    </div>
  );
}
