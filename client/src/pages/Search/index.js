import axios from "axios";
// import { axiosApiInstance } from "../../utils/axiosConfig";
import { useEffect, useState, Fragment } from "react";
import ProfilePostCard from "../Profile/ProfilePostCard";
import SmallUserCard from "./SmallUserCard";
import { useLocation } from "react-router-dom";
import NoResult from "./NoResult";
import ScreenLoading from "@components/ScreenLoading";
import "./styles.css";
import ResultTabs from "./ResultTabs";
const scopeList = ["posts", "users"]; // TODO: add search all if time permits , "all"

export default function Search() {
  const query = new URLSearchParams(useLocation().search);
  const scope = query.get("scope");
  const value = decodeURIComponent(query.get("value"));

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  let location = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const runSearch = async () => {
    const res = await axios.get(`/search/api/search/${scope}/${value}`);
    console.log("SEARECH DATA: ", res);
    if (res.status===200) {
      if(scope==="posts") {
        setPosts(res.data);
      } else if(scope==="users") {
        setUsers(res.data);
      }
    }
  };

  //need to fix the behaviour when the user searches again. The state still has the prev values
  useEffect(() => {
    if (scope && value) {
      if (scopeList.includes(scope)) {
        runSearch();
      }
    }
  }, [scope, value, location]);

  const renderPostSection = () => {
    return (
      <div>
        {scope !== "all" && (
          <h2 style={{ textAlign: "center" }}>Post Results:</h2>
        )}
        {posts.length === 0 ? (
          <NoResult />
        ) : (
          <div className="">
              {posts.map((post, index) => {
                return <ProfilePostCard key={post.id} post={post} />;
              })}
          </div>
        )}
      </div>
    );
  };

  const renderUserSection = () => {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>User Results:</h2>
        {users.length === 0 ? (
          <NoResult />
        ) : (
          users.map((user) => <SmallUserCard person={user} />)
        )}
      </div>
    );
  };

  const setUpTemplate = () => {
    switch (scope) {
      case "posts":
        return renderPostSection();

      case "users":
        return renderUserSection();

      default:
        return <ResultTabs posts={posts} users={users} />;
    }
  };

  return loading ? (
    <ScreenLoading />
  ) : (
    <Fragment>
      <div>
        <div className="container-fluid">
          <div style={{ marginTop: "2em" }}> {setUpTemplate()}</div>
        </div>
      </div>
    </Fragment>
  );
}
