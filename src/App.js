import "./assets/styles/App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import A4BMenu from "./components/A4BMenu/Menu";
import { AiOutlineMail, AiFillYoutube, AiFillMail } from "react-icons/ai";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);

    // ASR Option Choices
    if (!localStorage.getItem("asrLanguageChoice"))
      localStorage.setItem("asrLanguageChoice", "hi");
    if (!localStorage.getItem("samplingRateChoice"))
      localStorage.setItem("samplingRateChoice", 16000);
    if (!localStorage.getItem("processorChoice"))
      localStorage.setItem(
        "processorChoice",
        JSON.stringify({ processors: [] })
      );

    // XLit Option Choices
    if (!localStorage.getItem("tltLanguageChoice"))
      localStorage.setItem("tltLanguageChoice", "hi");

    // NLG Option Choices
    if (!localStorage.getItem("nlgLanguageChoice"))
      localStorage.setItem("nlgLanguageChoice", "hi");

    if (!localStorage.getItem("nlgTaskChoice"))
      localStorage.setItem("nlgTaskChoice", "IndicSentenceSummarization");

    // NMT Option Choices
    if (!localStorage.getItem("nmtLanguageFrom"))
      localStorage.setItem("nmtLanguageFrom", "hi");

    if (!localStorage.getItem("nmtLanguageTo"))
      localStorage.setItem("nmtLanguageTo", "en");

    // TTS Option Choices
    if (!localStorage.getItem("ttsLanguageChoice"))
      localStorage.setItem("ttsLanguageChoice", "hi");

    if (!localStorage.getItem("ttsVoiceGender"))
      localStorage.setItem("ttsVoiceGender", "male");

    // NER Option Choices
    if (!localStorage.getItem("nerLanguageChoice"))
      localStorage.setItem("nerLanguageChoice", "hi");
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
          <div className="footer-social-icons">
            {/* Add your social icons here */}
            <a
              href="mailto:your-email@example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillMail size={20} />
            </a>
            <a
              href="https://twitter.com/your-twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter size={20} />
            </a>
            <a
              href="https://youtube.com/your-youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillYoutube size={25} />
            </a>
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsLinkedin size={18} />
            </a>
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub size={20} />
            </a>
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt size={20} />
            </a>
          </div>

          <div className="footer-about-container">
            <div className="footer-title-container">
              Made with 🧡 and open-source by AI4Bhārat
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
