import "./assets/styles/App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import A4BMenu from "./components/A4BMenu/Menu";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="a4b-page-container">
        <div className="nav">
          <A4BMenu />
        </div>
        <div className="a4b-container">
          <Outlet/>
        </div>
        <div className="nav"></div>
      </div>
    );
  }
}

export default App;
