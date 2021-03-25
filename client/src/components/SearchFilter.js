import { useLocation } from "react-router-dom";

export default function SearchFilter() {
  let location = useLocation;
  // Not sure if I need pathname or search

  const filterHot = () => {};

  const filterNew = () => {};

  return (
    <div className="card flex-row p-2 mt-3">
      <button
        className="btn btn-outline-primary m-2 btn-lg"
        onClick={filterHot}
      >
        Hot
      </button>
      <button className="btn btn-outline-danger m-2 btn-lg" onClick={filterNew}>
        New
      </button>
    </div>
  );
}
