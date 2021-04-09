import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TagFilter from "./TagFilter";
import "./searchfilter.css";

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
    <div className="card flex-row m-2 mt-3 align-items-center justify-content-between">
      <div className="d-none d-md-block ">
        <Link to={handlePath("hot")}>
          <button
            className={`btn m-2 btn-lg ${
              filterType === "hot" ? "btn-danger" : "btn-outline-danger"
            } `}
          >
            hot
          </button>
        </Link>
        <Link to={handlePath("new")}>
          <button
            className={`btn m-2 btn-lg ${
              filterType === "new" ? "btn-primary" : "btn-outline-primary"
            } `}
          >
            New
          </button>
        </Link>
      </div>
      <div className="d-md-none dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          Dropdown
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#nogo">
            Item 1
          </a>
          <a className="dropdown-item" href="#nogo">
            Item 2
          </a>
          <a className="dropdown-item" href="#nogo">
            Item 3
          </a>
        </div>
      </div>
      <div className="m-2">
        <p className="m-1">Filter By Tags</p>
        <TagFilter setTags={setTags} />
      </div>
    </div>
  );
}
