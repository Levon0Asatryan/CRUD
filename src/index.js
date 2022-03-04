import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
