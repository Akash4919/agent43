import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Agent/Routing";
import { StyledEngineProvider } from "@mui/material";
import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <Routing />
          {/* <ProfilePage /> */}
        </StyledEngineProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
