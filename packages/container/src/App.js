import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import MarketingApp from "./components/marketing-app";
export default () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <hr />
        <MarketingApp />
      </div>
    </BrowserRouter>
  );
};
