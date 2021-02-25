import { Link } from 'react-router-dom';
const Home = () => {
  const id = 4;
  return (
    <div>
      <h1>Home Page</h1>
      <Link to={`/post/${id}`}>POST - {id}</Link>
    </div>
  );
};

export default Home;
