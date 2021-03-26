import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import ProfilePostCard from "../Profile/ProfilePostCard";
import SmallPlantCard from "./SmallPlantCard";
import UserCard from "../../components/UserCard";
import { useLocation } from "react-router-dom";
import SearchFilter from "../../components/SearchFilter";
import NoResult from "./NoResult";

const scopeList = ["posts", "all", "plants", "users"];

export default function Search() {
  const query = new URLSearchParams(useLocation().search);
  const scope = query.get("scope");
  const value = decodeURIComponent(query.get("value"));

  const [plants, setPlants] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  let location = useLocation();
  let filterType = useLocation().pathname.includes("new") ? "new" : "hot";

  const runSearch = async () => {
    const res = await axios.get(`/api/search/${scope}/${value}`, {
      params: {
        filterType,
      },
    });
    if (res.data.success) {
      res.data.posts && setPosts(res.data.posts);
      res.data.users && setUsers(res.data.users);
      res.data.plants && setPlants(res.data.plants);
    }
  };

  useEffect(() => {
    if (scope && value) {
      if (scopeList.includes(scope)) {
        runSearch();
      }
    }
  }, [scope, value, location]);

  const renderPlantSection = () => {
    return (
      <div>
        <h3>Plant Results:</h3>
        {plants.length === 0 ? (
          <NoResult />
        ) : (
          plants.map((plant) => <SmallPlantCard plant={plant} />)
        )}
      </div>
    );
  };

  const renderPostSection = () => {
    return (
      <div>
        <SearchFilter />
        <h3>Post Results:</h3>
        {posts.length === 0 ? (
          <NoResult />
        ) : (
          posts.map((post) => <ProfilePostCard post={post} />)
        )}
      </div>
    );
  };

  const renderUserSection = () => {
    return (
      <div>
        <h3>User Results:</h3>
        {users.length === 0 ? (
          <NoResult />
        ) : (
          users.map((user) => <UserCard person={user} />)
        )}
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
          {console.log(location, "LOCATION IN SEARCH")}
          <div> {setUpTemplate()}</div>
        </div>
      </div>
    </Fragment>
  );
}
