import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useUserContext();

  const handleSubmit = () => {
    if (email && password) {
      axios
        .post('/api/login', { email: email, password: password })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            props.history.push('/');
          }
          console.log('res: ', res.data.success);
        });
    }
  };

  return (
    <div>
      {user && user.email}
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Login</button>
      <Link to="/signup">SIGN UP </Link>
    </div>
  );
}
