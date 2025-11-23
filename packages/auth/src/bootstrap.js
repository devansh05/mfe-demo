import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (
  el,
  { onSignInCallback, onNavigate, defaultHistory, initialPath }
) => {
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });
  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDOM.render(
    <App history={history} onSignInCallback={onSignInCallback} />,
    el
  );
  return {
    // this function will be called whenever the container navigates
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

export default mount;

// when the app is running in isolation
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth_dev_root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}
//when the app is running in container
export { mount };
