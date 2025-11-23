import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = ({history}) => {
  const generateClassName = createGenerateClassName({
    productionPrefix: "au",
  });

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default App;
