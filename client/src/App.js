import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route path="/signup" exact render={(props) => <SignUp {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
