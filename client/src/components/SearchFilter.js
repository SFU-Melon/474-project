import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TagFilter from "./TagFilter";

export default function SearchFilter({ setTags }) {
  let location = useLocation();
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    setClickedButtons();
  }, [location]);

  const setClickedButtons = () => {
    if (location.pathname.includes("new")) {
      setFilterType("new");
    } else {
      setFilterType("hot");
    }
  };

  // location: (/hot or /)  type: hot -> same
  // location: /new type: new -> same
  // ->  location.pathname.includes(type) || (type==='hot' && !location.pathname.includes("new")) ? true : false

  const handleFilter = () => {
    console.log(filterType, "filtertype on Click");
  };

  const handlePath = (type) => {
    return {
      pathname: location.pathname.includes("search")
        ? `/search/${type}/${location.search}`
        : `/${type}`,
      state: {
        isPrevTypeTheSame:
          location.pathname.includes(type) ||
          (type === "hot" && !location.pathname.includes("new"))
            ? true
            : false,
      },
    };
  };

  return (
    <div className="card flex-row p-2 mt-3 align-items-center justify-content-between">
      <div>
        <Link to={handlePath("hot")}>
          <button
            className={`btn m-2 btn-lg ${
              filterType === "hot" ? "btn-danger" : "btn-outline-danger"
            } `}
            onClick={handleFilter}
          >
            hot
          </button>
        </Link>
        <Link to={handlePath("new")}>
          <button
            className={`btn m-2 btn-lg ${
              filterType === "new" ? "btn-primary" : "btn-outline-primary"
            } `}
            onClick={handleFilter}
          >
            New
          </button>
        </Link>
      </div>
      <div className="">
        <p className="m-1">Filter By Tags</p>
        <TagFilter setTags={setTags} />
      </div>
    </div>
  );
}
