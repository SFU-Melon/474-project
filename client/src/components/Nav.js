import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const Nav = () => {
  return (
    <Navbar>
      <Link to="/">HOME</Link>
      <Link to="/login">LOGIN</Link>
    </Navbar>
    // <div className="container">
    //   <Link to="/">HOME</Link>
    //   <Link to="/login">LOGIN</Link>
    // </div>
  );
};

export default Nav;
