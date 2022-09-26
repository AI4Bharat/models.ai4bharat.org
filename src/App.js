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
        <footer className="footer">
          <div className="footer-about-container">
            <div className="footer-title-container">
              <img
                className="a4b-logo"
                alt="a4blogo"
                width={50}
                height={50}
                src={require("../src/media/a4b.png")}
              />
              <h4 className="footer-title">AI4Bharat</h4>
            </div>
            <div className="footer-about-content">
              The focus of AI4Bharat, an initiative of IIT Madras, is on
              building open-source language AI for Indian languages, including
              datasets, models, and applications.
            </div>
          </div>
          <div className="footer-contact-container">
            <div className="footer-title-container">
              <h4 className="footer-title">Contact</h4>
            </div>
            <div className="footer-contact-content">
              <div className="footer-contact-row">
                <TiLocation size={35} className="footer-contact-logo" />
                <span className="footer-contact-row-text">
                  Address: Department of Computer Science and Engineering, IIT
                  Madras, Chennai - 600036
                </span>
              </div>
              <div className="footer-contact-row">
                <BsGithub
                  href="https://github.com/AI4Bharat"
                  size={35}
                  className="footer-contact-logo"
                />
                <a
                  className="footer-contact-row-text"
                  href="https://github.com/AI4Bharat"
                >
                  github.com/AI4Bharat
                </a>
              </div>
              <div className="footer-contact-row">
                <BsTwitter
                  href="https://twitter.com/ai4bharat"
                  size={35}
                  className="footer-contact-logo"
                />
                <a
                  className="footer-contact-row-text"
                  href="https://twitter.com/ai4bharat"
                >
                  twitter.com/ai4bharat
                </a>
              </div>
              <div className="footer-contact-row">
                <BsLinkedin
                  href="https://www.linkedin.com/company/ai4bharat/"
                  size={35}
                  className="footer-contact-logo"
                />
                <a
                  className="footer-contact-row-text"
                  href="https://www.linkedin.com/company/ai4bharat/"
                >
                  linkedin.com/company/ai4bharat/
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
