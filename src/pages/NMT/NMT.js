import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { Button } from "@mui/material";

export default class NMT extends React.Component {
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
              renderComponent={(props) => (
                <textarea className="a4b-transliterate-text" {...props} />
              )}
              value={this.state.transliteratedText}
              placeholder="Type your text here to transliterate...."
              onChangeText={(text) => {
                this.setTransliteratedText(text);
              }}
              lang={this.state.languageChoice}
            />
          </div>
        </div>
      </div>
    );
  }
}
