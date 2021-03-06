export default function PostCard({ content }) {
  return (
    <div className="card flex-row p-3 m-2">
      <div className="vote p-3 d-flex flex-column align-items-center">
        <button className="btn btn-outline-secondary btn-sm">
          <span className="material-icons">arrow_upward</span>
        </button>
        <span className="p-1">30</span>
        <button className="btn btn-outline-secondary btn-sm">
          <span className="material-icons">arrow_downward</span>
        </button>
      </div>
      <div>
        <h2>{content}</h2>
        <div className="d-flex flex-row justify-content-between">
          <span>Posted by Travis in PHX (9b)</span>
          <span>1 hours ago</span>
          <span>Tags</span>
          <span>3 Comments </span>
          <span>Updated 36 minutes ago</span>
        </div>
      </div>
    </div>
  );
}
