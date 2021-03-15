import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Plants from "./pages/Plants";
import Error from "./pages/Error";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoutes from "./protected-routes/ProtectedRoutes";
import { AuthProvider } from "./contexts/AuthContext";



function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Nav />
            <div className="content">
              <Switch>
                <Route exact path="/post/:title/:id" component={Post} />
                <Route exact path="/plants" component={Plants} />
                <Route exact path="/" component={Home} />
                <ProtectedRoutes
                  exact
                  path="/profile/:username"
                  component={Profile}
                  template={"accessibleAfterLogin"}
                />
                <ProtectedRoutes
                  exact
                  path="/login"
                  component={Login}
                  template={"accessibleBeforeLogin"}
                />
                <ProtectedRoutes
                  path="/signup"
                  exact
                  component={SignUp}
                  template={"accessibleBeforeLogin"}
                />
                <Route
                  path="*"
                  component={() => <Error msg={"404 NOT FOUND"} />}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
