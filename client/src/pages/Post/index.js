import { useParams } from 'react-router-dom';
const Post = () => {
  const { id } = useParams();

  return <div> POST PAGE - {id}</div>;
};

export default Post;
