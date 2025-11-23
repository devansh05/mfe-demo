import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthApp = ({ onSignedIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      //to manage sign in state from container from AuthApp 
      // onSignedIn called in app.js to set signedIn data
      onSignInCallback: onSignedIn,
    });
    history.listen(onParentNavigate);
  }, [history, onSignedIn]);

  return <div ref={ref} />;
};
export default AuthApp;
