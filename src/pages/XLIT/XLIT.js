import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaRegCopy } from "react-icons/fa";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { xlitDocumentation } from "./xlitDocumentation";
import { Button } from "@mui/material";
import Documentation from "../../components/A4BDocumentation/Documentation";

export default class XLit extends React.Component {
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
    this.sortedLanguages = {};
  }

  componentWillMount() {
    const _this = this;
    const languages = Object.keys(_this.languages);
    languages.sort();
    languages.forEach((key) => {
      _this.sortedLanguages[key] = _this.languages[key];
    });
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
              className="a4b-logo"
              alt="a4blogo"
              width={50}
              height={50}
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
              MenuProps={{
                disableScrollLock: true,
              }}
              value={this.state.languageChoice}
              sx={{ borderRadius: 15 }}
              onChange={(e) => {
                this.setState({ languageChoice: e.target.value });
              }}
              className="a4b-option-select"
            >
              {Object.entries(this.sortedLanguages).map(([language, optionText]) => {
                return (
                  <MenuItem sx={{ margin: 1 }} value={language}>
                    {optionText}
                  </MenuItem>
                );
              })}
            </Select>
          </label>
        </div>
        <div className="a4b-interface">
          <div className="a4b-output">
            <div className="a4b-transliterate-container">
              <IndicTransliterate
                className="a4b-transliterate-text"
                renderComponent={(props) => <textarea {...props} />}
                value={this.state.transliteratedText}
                placeholder="Type your text here to transliterate...."
                onChangeText={(text) => {
                  this.setTransliteratedText(text);
                }}
                lang={this.state.languageChoice}
              />
            </div>
          </div>
          <Documentation documentation={xlitDocumentation} />
        </div>
      </div>
    );
  }
}