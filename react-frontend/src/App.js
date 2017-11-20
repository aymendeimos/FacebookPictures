import React, { Component } from "react";
import { BrowserRouter as Router ,Route, Switch} from "react-router-dom";

import UserRegister from "./components/userRegister";
import UserLogin from "./components/userLogin";
import Notfound from "./components/Notfound";
import Firstpage from "./components/Firstpage";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route  exact path="/user-registration" component={UserRegister}/>
          <Route  exact path="/user-login" component={UserLogin}/>
          <Route  exact path="/" component={Firstpage}/>
          <Route component={Notfound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;