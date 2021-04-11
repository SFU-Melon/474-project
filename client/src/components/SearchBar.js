import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
/****
 * props: {
 * handleSearch: func
 * }
 */
import "./nav.css";

const SearchBar = (props) => {
  let history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const qscope = query.get("scope");
  const [value, setValue] = useState("");
  const [scope, setScope] = useState(qscope ? qscope : "posts");

  const handleSearch = (e) => {
    if (value && e.key === "Enter") {
      const encodedValue = encodeURIComponent(value);
      history.push(`/search?value=${encodedValue}&scope=${scope}`);
    }
  };
  return (
    <div className="d-flex flex-col search-container">
      <input
        className="w-100"
        placeholder="What are you looking for?"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSearch}
      />
      <select
        className="form-select w-25 search-bar"
        value={scope}
        onChange={(e) => setScope(e.target.value)}
      >
        <option value="posts">Posts</option>
        <option value="users">Users</option>
        <option value="plants">Plants</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};

export default SearchBar;
