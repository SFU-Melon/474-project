import axios from "axios";
import { Fragment } from "react";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";

export default function NewPosts() {
  const fetchPosts = async ({ pageParam }) => {
    console.log(data, "data in fetchPosts");
    try {
      const res = await axios.get("/api/getPosts", {
        params: {
          filterType: "new",
          val: pageParam?.datetime,
          sortingId: pageParam?.sortingid,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    "newPosts",
    fetchPosts,
    {
      getNextPageParam: (lastPage, pages) => lastPage?.[lastPage.length - 1],
    }
  );

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      {data && (
        <InfiniteScroll
          dataLength={data.length * 4}
          pageStart={0}
          next={fetchNextPage}
          hasMore={hasNextPage}
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
          {data.pages.map((page, i) => (
            <Fragment key={i}>
              {page.map((post) => {
                return <PostCard key={post.id} post={post}></PostCard>;
              })}
            </Fragment>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
