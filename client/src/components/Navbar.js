import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="container">
      <Link to="/">HOME</Link>
      <Link to="/login">LOGIN</Link>
    </div>
  );
};

export default Navbar;
