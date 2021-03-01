import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Plant from './pages/Plant';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoutes from './protected-routes/ProtectedRoutes';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Nav />
          <div className="content">
            <Switch>
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/plant/:id" component={Plant} />
              <Route exact path="/" component={Home} />
              <ProtectedRoutes
                exact
                path="/profile/:username"
                component={Profile}
                template={'accessibleAfterLogin'}
              />
              <ProtectedRoutes
                exact
                path="/login"
                component={Login}
                template={'accessibleBeforeLogin'}
              />
              <ProtectedRoutes
                path="/signup"
                exact
                component={SignUp}
                template={'accessibleBeforeLogin'}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
