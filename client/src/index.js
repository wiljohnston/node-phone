import React from "react";
import ReactDOM from "react-dom";
import AppProvider from "./context/AppContext";
import App from "./App";
import "./scss/index.scss";
import "./tailwind.output.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
