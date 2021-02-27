import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

function App() {
  return (
<<<<<<< HEAD
    <div className="">
      <h1>Appsdfas</h1>
    </div>
=======
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route path="/signup" exact render={(props) => <SignUp {...props} />} />
      </Switch>
    </BrowserRouter>
>>>>>>> 8ed2c88ccc0da320a744f6a3bd6be6fa1b47a822
  );
}

export default App;
