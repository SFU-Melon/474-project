import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useState } from 'react';

export default function Home() {
  const id = 4;
  const { user } = useUserContext();
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    axios
      .post(`/api/createPost/${user.id}`, { content: content })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <div>
          <h1>{user.username}</h1>
        </div>
      )}
      <Link to={`/post/${id}`}>POST - {id}</Link>
      <input
        type="text"
        placeholder="content"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>CREATE POST</button>
    </div>
  );
}
