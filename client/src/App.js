import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Plant from './pages/Plant';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Nav />
          <div className="content">
            <Switch>
              <Route path="/profile/:username" component={Profile} />
              <Route path="/post/:id" component={Post} />
              <Route path="/plant/:id" component={Plant} />
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
    </UserProvider>
  );
}

export default App;
