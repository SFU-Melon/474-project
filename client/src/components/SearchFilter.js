import { Link, useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import TagFilter from "./TagFilter";
import { Dropdown } from "semantic-ui-react";

import "./searchfilter.css";

const filterOptions = [
  {
    key: "hot",
    text: "HOT",
    value: "hot",
  },
  {
    key: "new",
    text: "NEW",
    value: "new",
  },
];

export default function SearchFilter({ setTags }) {
  let location = useLocation();
  let history = useHistory();
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

  const handleFilterType = (e, { value }) => {
    history.push(`/${value}`);
  };

  return (
    <div className="card flex-row m-2 mt-3 align-items-center justify-content-between">
      <div className="button-filter">
        <Link to={handlePath("hot")}>
          <button
            className={`btn m-2 btn-lg ${
              filterType === "hot" ? "btn-danger" : "btn-outline-danger"
            } `}
          >
            Hot
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
      <div className="dropdown-filter m-2">
        <Dropdown
          placeholder="HOT"
          fluid
          selection
          defaultValue={"hot"}
          options={filterOptions}
          onChange={handleFilterType}
        />
      </div>
      <div className="m-2">
        <p className="m-1">Filter By Tags</p>
        <TagFilter setTags={setTags} />
      </div>
    </div>
  );
}
