import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Plant from './pages/Plant';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="content">
          <Switch>
            <Route path="/profile/:username">
              <Profile></Profile>
            </Route>
            <Route path="/post/:id">
              <Post></Post>
            </Route>
            <Route path="/plant/:id">
              <Plant></Plant>
            </Route>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/signup"
              exact
              render={(props) => <SignUp {...props} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
