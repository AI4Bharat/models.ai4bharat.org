import "./assets/styles/App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import A4BMenu from "./components/A4BMenu/Menu";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";

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
        <div className="footer">
          {/* <div className="footer-about-container">
            <div className="footer-about-title-container">
              <img
                className="a4b-logo"
                alt="a4blogo"
                width={32}
                height={29}
                src={require("../src/media/a4b.png")}
              />
              <h4 className="footer-about-title">AI4Bharat</h4>
            </div>
            <span className="footer-text">
              The focus of AI4Bharat, an initiative of IIT Madras, is on
              building open-source language AI for Indian languages, including
              datasets, models, and applications.
            </span>
          </div>
          <div className="footer-contact-container">
            <div className="footer-contact-title-container">
              <h4 className="footer-about-title">Contact</h4>
            </div>
            <span className="footer-contact-link">
              <TiLocation style={{marginLeft:5}} size={30} color={"#f06b42"} />
              Address: Department of Computer Science and Engineering, IIT
              Madras, Chennai - 600036
            </span>
            <br />
            <a className="nav-link" href="https://github.com/AI4Bharat">
              {" "}
              <BsGithub style={{margin:5}} size={30} color={"#f06b42"} /> github.com/AI4Bharat
            </a>
            <br />
            <a className="nav-link" href="https://twitter.com/ai4bharat">
              {" "}
              <BsTwitter style={{margin:5}} size={30} color={"#f06b42"} />
              twitter.com/ai4bharat
            </a>
            <br />
            <a
              className="nav-link"
              href="https://www.linkedin.com/company/ai4bharat/"
            >
              <BsLinkedin style={{margin:5}} size={30} color={"#f06b42"} />
              linkedin.com/company/ai4bharat
            </a>
          </div> */}
        </div>
      </div>
    );
  }
}

export default App;
