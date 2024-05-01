import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";


ReactDOM.render(
  <React.StrictMode>
    <App isLoggedIn={false} displayDrawer={true} logOut={() => {}} />
  </React.StrictMode>,
  document.getElementById("root")
);
