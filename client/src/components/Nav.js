import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="container">
      <Link to="/">HOME</Link>
      <Link to="/login">LOGIN</Link>
    </nav>
  );
};

export default Nav;
