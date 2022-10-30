import React from "react";
import Navbar from "./CommonComponents/navBar";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
