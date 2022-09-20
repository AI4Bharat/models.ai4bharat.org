import "./assets/styles/App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import A4BMenu from "./components/A4BMenu/Menu";

class App extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("languageChoice"))
      localStorage.setItem("languageChoice", "hi");
    if (!localStorage.getItem("samplingRateChoice"))
      localStorage.setItem("samplingRateChoice", 16000);
    if (!localStorage.getItem("processorChoice"))
      localStorage.setItem(
        "processorChoice",
        JSON.stringify({ processors: [] })
      );
    if (!localStorage.getItem("tlLanguageChoice"))
      localStorage.setItem("tlLanguageChoice", "hi");
    if (!localStorage.getItem("tltLanguageChoice"))
      localStorage.setItem("tltLanguageChoice", "hi");
    if (!localStorage.getItem("tlMode"))
      localStorage.setItem("tlMode", "en-ind");
  }

  render() {
    return (
      <div className="a4b-page-container">
        <div className="nav">
          <A4BMenu />
        </div>
        <div className="a4b-container">
          <Outlet />
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;
