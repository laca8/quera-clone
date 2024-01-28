import React from "react";
import Header from "./Header";
import "./css/quera.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
const Quera = () => {
  return (
    <div className="quora">
      <Header />
      <div className="quora__contents">
        <div className="quora__content">
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  );
};

export default Quera;
