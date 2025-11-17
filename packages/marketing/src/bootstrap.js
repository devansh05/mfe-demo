import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Mount function to start up the app
const mount = (el) => {
  return ReactDOM.render(<App />, el);
};

export default mount;

// when the app is running in isolation
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing_dev_root");

  if (devRoot) {
    mount(devRoot);
  }
}
//when the app is running in container
export { mount };
