import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="container">
      <Link to="/">HOME</Link>
      <Link to="/login">LOGIN</Link>
    </div>
  );
};

export default Nav;
