import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaRegCopy } from "react-icons/fa";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { xlitDocumentation } from "./xlitDocumentation";
import { Button } from "@mui/material";

export default class XLIT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageChoice: "hi",
      transliteratedText: null,
    };
    this.languages = {
      hi: "Hindi - हिंदी",
      mr: "Marathi - मराठी",
      as: "Assamese - অসমীয়া",
      bn: "Bangla - বাংলা",
      brx: "Boro - बड़ो",
      gu: "Gujarati - ગુજરાતી",
      kn: "	Kannada - ಕನ್ನಡ",
      ks: "Kashmiri - كٲشُر",
      gom: "Konkani Goan - कोंकणी",
      mai: "Maithili - मैथिली",
      ml: "Malayalam - മലയാളം",
      mni: "Manipuri",
      ne: "Nepali - नेपाली",
      or: "Oriya - ଓଡ଼ିଆ",
      pa: "Punjabi - ਪੰਜਾਬੀ",
      sa: "Sanskrit - संस्कृतम्",
      sd: "Sindhi - سنڌي",
      si: "Sinhala - සිංහල",
      ta: "Tamil - தமிழ்",
      te: "Telugu - తెలుగు",
      ur: "Urdu - اُردُو",
    };
  }

  setTransliteratedText(text) {
    this.setState({ transliteratedText: text });
  }

  renderSnippet(content) {
    if (content.snippet) {
      if (typeof content.snippet == "object") {
        return (
          <div className="a4b-snippet-container">
            <pre>{JSON.stringify(content.snippet, null, 2)}</pre>
            <div className="a4b-copy-container">
              <Button
                sx={{ height: 50, color: "#4a4a4a", borderColor: "#4a4a4a" }}
                size="large"
                variant="outlined"
                onClick={() => {
                  navigator.clipboard.writeText(content.snippet);
                }}
              >
                <FaRegCopy size={"20px"} />
              </Button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="a4b-snippet-container">
            <pre>{content.snippet}</pre>
            <div className="a4b-copy-container">
              <Button
                sx={{ height: 50, color: "#4a4a4a", borderColor: "#4a4a4a" }}
                size="large"
                variant="outlined"
                onClick={() => {
                  navigator.clipboard.writeText(content.snippet);
                }}
              >
                <FaRegCopy size={"20px"} />
              </Button>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div>
        <section className="title-section">
          <h1 className="title">
            <img
              alt="a4blogo"
              width={100}
              height={100}
              src={require("../../media/ai4bharat.jpg")}
            ></img>
            <span className="orange-color">AI4Bharat </span>
            Indic Transliteration (XLit)
          </h1>
          <p className="subtitle">
            Transliterate in real-time across various Indian Languages!
          </p>
        </section>
        <hr className="hr-split" />
        <div className="common-options">
          <label className="a4b-option">
            Choose Your Language :
            <Select
              value={this.state.languageChoice}
              sx={{ borderRadius: 15 }}
              onChange={(e) => {
                this.setState({ languageChoice: e.target.value });
              }}
              className="a4b-option-select"
            >
              {Object.entries(this.languages).map(([language, optionText]) => {
                return (
                  <MenuItem sx={{ margin: 1 }} value={language}>
                    {optionText}
                  </MenuItem>
                );
              })}
            </Select>
          </label>
        </div>
        <div className="asr-interface">
          <div className="a4b-output">
            <IndicTransliterate
              value={this.state.transliteratedText}
              placeholder="Type your text here to transliterate...."
              className="a4b-transliterate-text"
              onChangeText={(text) => {
                this.setTransliteratedText(text);
              }}
              lang={this.state.languageChoice}
            />
          </div>
          <div className="documentation-container">
            <div className="a4b-box">
              <div className="a4b-box1">
                <h1 className="documentation-title">Documentation</h1>
              </div>
              <hr className="hr-split" />
              <div className="a4b-box1">
                <div className="text-15">
                  <b>About</b>
                </div>
              </div>
              <br />
              <div className="a4b-box1">
                <div className="api-step-text">
                  <a href="https://www.npmjs.com/package/@ai4bharat/indic-transliterate">
                    Indic Transliterate
                  </a>{" "}
                  is a frontend library to enable your users to type in many
                  different languages of South Asia, and can be integrated into
                  any React-based application. This library is a fork of
                  react-transliterate, which uses Google Transliterate API which
                  supports around 40 languages across the globe. In this module,
                  our focus is to provide high-quality
                  transliteration-suggestions for Indic languages, especially
                  for low-resource languages like Kashmiri, Manipuri, etc.
                  (which are not supported by Google).
                </div>
              </div>
              <br />
              <hr className="hr-split" />
              <div className="a4b-box1">
                <h1 className="text-15">Usage:</h1>
              </div>
              {Object.entries(xlitDocumentation).map(([key, content]) => {
                return (
                  <div>
                    <div className="a4b-box1">
                      <h1 className="api-step-text">
                        {`${key}. ${content.step}`}
                      </h1>
                    </div>
                    {this.renderSnippet(content)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
