import React from "react";
import "./home.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

function Home() {
  return (
    <div className="home">
      <div className="content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
