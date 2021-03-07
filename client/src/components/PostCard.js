import LikeDislike from './LikeDislike';

export default function PostCard({ content, title, numOfLikes }) {
  return (
    <div className="card flex-row p-3 m-2">
      <LikeDislike numOfLikes={numOfLikes} />
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
