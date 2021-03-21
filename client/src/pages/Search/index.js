import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import PostCard from "../../components/PostCard";
import PlantCard from "../../components/PlantCard";
import UserCard from "../../components/UserCard";
import { useLocation } from "react-router-dom";

const scopeList = ["posts", "all", "plants", "users"];

export default function Search() {
  const query = new URLSearchParams(useLocation().search);
  const scope = query.get("scope");
  const value = decodeURIComponent(query.get("value"));

  const [plants, setPlants] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const runSearch = async () => {
    console.log("SEARCHING!");
    const res = await axios.get(`/api/search/${scope}/${value}`);
    console.log(res.data.posts);
  };

  useEffect(() => {
    if (scope && value) {
      if (scopeList.includes(scope)) {
        runSearch();
      }
    }
  }, [scope, value]);

  const renderPlantSection = () => {
    return (
      <div>
        <h3>Plant Section</h3>
        {plants.map((plant) => (
          <PlantCard plant={plant} />
        ))}
      </div>
    );
  };

  const renderPostSection = () => {
    return (
      <div>
        <h3>Post Section</h3>
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    );
  };

  const renderUserSection = () => {
    return (
      <div>
        <h3>User Section</h3>
        {users.map((user) => (
          <UserCard person={user} />
        ))}
      </div>
    );
  };

  const setUpTemplate = () => {
    switch (scope) {
      case "posts":
        return renderPostSection();

      case "plants":
        return renderPlantSection();

      case "users":
        return renderUserSection();

      default:
        return (
          <div className="row">
            <div className="col col-md-10">
              <div className="row">{renderPostSection()}</div>
              <div className="row">{renderPlantSection()}</div>
            </div>
            <div className="col col-md-auto">{renderUserSection()}</div>
          </div>
        );
    }
  };

  return (
    <Fragment>
      <div>
        <div className="container-fluid">
          <div> {setUpTemplate()}</div>
        </div>
      </div>
    </Fragment>
  );
}
