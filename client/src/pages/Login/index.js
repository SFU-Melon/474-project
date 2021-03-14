import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, setUser } = useUserContext();
  const { setAuth } = useAuthContext();
  let history = useHistory();

  const handleSubmit = () => {
    if (username && password) {
      axios
        .post('/api/login', { username: username, password: password })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            setAuth(true);
            if (props.location.state != undefined) {
              console.log('going to prev path');
              history.replace(props.location.state.prevPath);
            } else {
              console.log('going back to home');
              history.replace('/');
            }
            // ^ It's rendering home page for some reason. NEED TO FIGURE IT OUT LATER!!
            //history.goBack();
          } else {
            setErrorMessage('Username or Password is incorrect. Try Again.');
          }
          console.log('res: ', res.data.success);
        });
    }
  };

  return (
    <div>
      {user && user.username}
      <h1>Login</h1>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
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
