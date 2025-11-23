import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";

const App = ({ history, onSignInCallback }) => {
  const generateClassName = createGenerateClassName({
    productionPrefix: "au",
  });

  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <SignIn onSignIn={onSignInCallback} />
            </Route>
            <Route path="/auth/signup">
              <SignUp onSignIn={onSignInCallback} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default App;
