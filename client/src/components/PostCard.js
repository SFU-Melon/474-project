import Vote from './Vote';

export default function PostCard({
  postId,
  content,
  title,
  numOfLikes,
  location,
  imgUrl,
  voteStatus,
}) {
  return (
    <div className="card flex-row p-3 m-2">
      <Vote
        postId={postId}
        numOfLikes={numOfLikes}
        preVoteStatus={voteStatus}
      />
      <div>
        <h2>{title}</h2>
        <div className="d-flex flex-row justify-content-between">
          <span>Posted by Travis in PHX (9b)</span>
          <span>1 hours ago</span>
          <span>{location}</span>
          <span>3 Comments </span>
          <span>Updated 36 minutes ago</span>
        </div>
      </div>
    </div>
  );
}
