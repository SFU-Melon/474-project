import axios from "axios";
import { Fragment } from "react";
import PostCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { useLocation } from "react-router-dom";

//NEED TO FILTER PAGES
export default function PostsList({ tags }) {
  let filterType = useLocation().pathname.includes("new") ? "new" : "hot";
  const fetchPosts = async ({ pageParam }) => {
    try {
      const res = await axios.get("/api/getPosts", {
        params: {
          filterType,
          val:
            filterType === "hot"
              ? pageParam?.params?.numoflikes
              : pageParam?.datetime,
          sortingId: pageParam?.params?.sortingid,
          tags,
        },
      });

      if (filterType === "new") {
        return res.data;
      }

      if (pageParam === undefined) {
        //Return without filtering for the first page
        return res.data;
      }

      //Filter out the elements that are in the previous pages
      let newPage = res.data;
      pageParam.prevPages.forEach((page) =>
        page.forEach(
          (post) =>
            (newPage = newPage.filter((newPost) => newPost.id !== post.id))
        )
      );
      return newPage;
    } catch (err) {
      console.log(err);
    }
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    ["posts", filterType, tags],
    fetchPosts,
    {
      getNextPageParam: (lastPage, pages) => {
        if (filterType === "new") {
          return lastPage?.[lastPage.length - 1];
        }
        if (lastPage?.[lastPage.length - 1] === undefined) {
          return undefined;
        }
        return {
          tags,
          prevPages: pages,
          params: lastPage?.[lastPage.length - 1],
        };
      },
    }
  );

  const calculateLength = () => {
    let count = 0;
    data.pages.forEach((page) => page.forEach((post) => count++));
    return count;
  };

  return status === "loading" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      {data && (
        <InfiniteScroll
          dataLength={calculateLength}
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
          {data.pages?.map((page, i) => (
            <Fragment key={i}>
              {page?.map((post) => {
                return <PostCard key={post.id} post={post}></PostCard>;
              })}
            </Fragment>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
