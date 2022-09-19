import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { Button } from "@mui/material";
import Documentation from "../../components/A4BDocumentation/Documentation";
import { nmtDocumentation } from "./nmtDocumentation";

export default class NMT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageChoice: "hi",
      transliteratedText: null,
      translatedText: null,
      mode: "en-ind",
    };

    this.translationAPIEndpoint = {
      "en-ind":
        "https://hf.space/embed/ai4bharat/IndicTrans-English2Indic/+/api/predict/",
      "ind-en":
        "https://hf.space/embed/ai4bharat/IndicTrans-Indic2English/+/api/predict/",
    };

    this.languages = {
      hi: ["Hindi - हिंदी", "Hindi"],
      mr: ["Marathi - मराठी", "Marathi"],
      as: ["Assamese - অসমীয়া", "Assamese"],
      gu: ["Gujarati - ગુજરાતી", "Gujarati"],
      kn: ["Kannada - ಕನ್ನಡ", "Kannada"],
      ml: ["Malayalam - മലയാളം", "Malayalam"],
      or: ["Oriya - ଓଡ଼ିଆ", "Odia"],
      pa: ["Punjabi - ਪੰਜਾਬੀ", "Punjabi"],
      ta: ["Tamil - தமிழ்", "Tamil"],
      te: ["Telugu - తెలుగు", "Telugu"],
      bn: ["Bangla - বাংলা", "Bengali"],
    };

    this.sortedLanguages = {};

    this.getTranslation = this.getTranslation.bind(this);
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

  getTranslation() {
    const _this = this;
    fetch(this.translationAPIEndpoint[this.state.mode], {
      method: "POST",
      body: JSON.stringify({
        data: [
          _this.state.transliteratedText,
          _this.languages[_this.state.languageChoice][1],
        ],
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json_response) {
        _this.setState({ translatedText: json_response.data[0] });
      });
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
            Indic Translation (NMT)
          </h1>
          <p className="subtitle">
            Translate in real-time across various Indian Languages!
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
              {Object.entries(this.sortedLanguages).map(
                ([language, optionText]) => {
                  return (
                    <MenuItem sx={{ margin: 1 }} value={language}>
                      {optionText[0]}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </label>
          <label className="a4b-option">
            Choose Mode:
            <Select
              sx={{ borderRadius: 15 }}
              value={this.state.mode}
              onChange={(e) => {
                this.setState({ mode: e.target.value, transliteratedText: "" });
              }}
              className="a4b-option-select"
              MenuProps={{
                disableScrollLock: true,
              }}
            >
              <MenuItem sx={{ margin: 1 }} value={"en-ind"}>
                English-to-Indic
              </MenuItem>
              <MenuItem sx={{ margin: 1 }} value={"ind-en"}>
                Indic-to-English
              </MenuItem>
            </Select>
          </label>
        </div>
        <div className="a4b-interface">
          <div className="a4b-output">
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
            <div>
              <Button
                onClick={() => {
                  this.getTranslation();
                }}
                sx={{
                  backgroundColor: "#eb7752",
                  borderRadius: 15,
                  padding: "15px 32px",
                  ":hover": { backgroundColor: "#eb7752" },
                  margin: 2.5,
                }}
                variant="contained"
              >
                Translate
              </Button>
            </div>
            <textarea
              value={this.state.translatedText}
              placeholder="View Translated Input here....."
              className="a4b-transliterate-text"
            />
          </div>
          <Documentation documentation={nmtDocumentation} />
        </div>
      </div>
    );
  }
}
