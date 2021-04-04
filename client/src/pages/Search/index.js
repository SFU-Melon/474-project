import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import ProfilePostCard from "../Profile/ProfilePostCard";
import SmallPlantCard from "./SmallPlantCard";
import UserCard from "../../components/UserCard";
import { useLocation } from "react-router-dom";
import NoResult from "./NoResult";
import InfiniteScroll from "react-infinite-scroll-component";
import "./section.css";
const scopeList = ["posts", "all", "plants", "users"];

export default function Search() {
  const query = new URLSearchParams(useLocation().search);
  const scope = query.get("scope");
  const value = decodeURIComponent(query.get("value"));

  const [plants, setPlants] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  let location = useLocation();
  let lastPost, lastElementRank;

  const runSearch = async (isFirst) => {
    if (isFirst === "first") {
      setHasMore(true);
    }
    const res = await axios.get(`/api/search/${scope}/${value}`, {
      params: {
        lastElementSubVal: lastPost?.numoflikes,
        lastElementRank: isFirst === "first" ? undefined : lastPost?.rank,
        sortingId: lastPost?.sortingid,
      },
    });
    if (res.data.success) {
      if (res.data.posts) {
        if (isFirst !== "first") {
          //filtering out the same posts from prev posts in newPosts
          const newPosts = res.data.posts.filter(
            (element) => !posts.map((post) => post.id).includes(element.id)
          );
          setPosts((prev) => [...prev, ...newPosts]);
        } else {
          setPosts(res.data.posts);
        }
      }
      res.data.users && setUsers(res.data.users);
      res.data.plants && setPlants(res.data.plants);
    }
    if (res.data.posts === undefined || res.data.posts?.length === 0) {
      setHasMore(false);
    }
  };

  //need to fix the behaviour when the user searches again. The state still has the prev values
  useEffect(() => {
    if (scope && value) {
      if (scopeList.includes(scope)) {
        runSearch("first");
      }
    }
  }, [scope, value, location]);

  const renderPlantSection = () => {
    return (
      <div className={`${scope === "all" && "mt-3"}`}>
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
        {scope !== "all" && <h3 className="">Post Results:</h3>}
        {posts.length === 0 ? (
          <NoResult />
        ) : (
          <div className="">
            <InfiniteScroll
              dataLength={posts.length}
              pageStart={0}
              next={runSearch}
              hasMore={hasMore}
              scrollableTarget={scope === "all" && "post-scrollable"}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts.map((post, index) => {
                if (posts.length === index + 1) {
                  lastPost = post;
                }
                return <ProfilePostCard key={post.id} post={post} />;
              })}
            </InfiniteScroll>
          </div>
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
              <h3 className="">Post Results:</h3>
              <div className="post-section row" id="post-scrollable">
                {renderPostSection()}
              </div>
              <div className="plant-section row">{renderPlantSection()}</div>
            </div>
            <div className="user-section col col-md-auto">
              {renderUserSection()}
            </div>
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
