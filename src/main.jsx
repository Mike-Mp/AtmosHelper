import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/_normalize.css";
import "./index.scss";
import { ThemeProvider } from "./components/ThemeProvider";

// import './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
