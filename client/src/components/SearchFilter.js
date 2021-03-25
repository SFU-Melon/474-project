import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SearchFilter() {
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

  const handleFilter = () => {
    console.log(filterType, "filtertype on Click");
  };

  const handlePath = (type) => {
    if (location.pathname.includes("search")) {
      return `/search/${type}/${location.search}`;
    } else {
      return `/${type}`;
    }
  };

  return (
    <div className="card flex-row p-2 mt-3">
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
  );
}
