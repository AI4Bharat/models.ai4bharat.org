import React from "react";
import {
  IndicTransliterate,
  TriggerKeys,
} from "@ai4bharat/indic-transliterate";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button, Tooltip, Switch } from "@mui/material";
import Documentation from "../../components/A4BDocumentation/Documentation";
import { nerDocumentation } from "./nerDocumentation";

const tag2Color = {
  "B-LOC": ["#ffcccc", "#ff0000"],
  "B-ORG": ["#cceeff", "#00aaff"],
  "B-PER": ["#d6f5d6", "#33cc33"],
  "I-LOC": ["#ffccdd", "#ff0055"],
  "I-ORG": ["#ffffcc", "#ffff00"],
  "I-PER": ["#e6ccff", "#8000ff"],
  O: ["#ffe6cc", "#ff8000"],
};

class NEROutput extends React.Component {
  render() {
    return (
      <div>
        {Object.entries(this.props.data).map(([idx, element]) => {
          return (
            <span
              className="a4b-transliterate-text"
              key={idx}
              style={{
                padding: 3,
                backgroundColor: tag2Color[element[1]][0],
                borderRadius: 15,
                lineHeight: 1.8,
                marginRight: 3,
              }}
            >
              {element[0]}{" "}
              <span
                style={{
                  padding: 3,
                  backgroundColor: tag2Color[element[1]][1],
                  borderRadius: 15,
                  color: "white",
                }}
              >
                {element[1]}
              </span>
            </span>
          );
        })}
      </div>
    );
  }
}

export default class NER extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageChoice: localStorage.getItem("nerLanguageChoice"),
      transliteratedText: "",
      nerOutput: [],
      enableTransliteration: true,
    };
    this.languages = {
      as: "Assamese - অসমীয়া",
      bn: "Bangla - বাংলা",
      gu: "Gujarati - ગુજરાતી",
      hi: "Hindi - हिंदी",
      kn: "Kannada - ಕನ್ನಡ",
      ml: "Malayalam - മലയാളം",
      mr: "Marathi - मराठी",
      or: "Oriya - ଓଡ଼ିଆ",
      ta: "Tamil - தமிழ்",
      te: "Telugu - తెలుగు",
      pa: "Punjabi - ਪੰਜਾਬੀ",
    };

    this.getNER = this.getNER.bind(this);
    this.toggleTransliteration = this.toggleTransliteration.bind(this);
  }

  toggleTransliteration() {
    this.setState({ enableTransliteration: !this.state.enableTransliteration });
  }

  getNER() {
    const _this = this;
    let apiURL = "https://ai4bharat-indicner.hf.space/run/predict";
    fetch(apiURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [_this.state.transliteratedText.trim()],
      }),
    })
      .then((response) => response.json())
      .then((json_response) => {
        const data = json_response["data"][0];
        _this.setState({ nerOutput: data });
      });
  }

  render() {
    return (
      <>
        <section className="title-section">
          <h1 className="title">
            <img
              className="a4b-logo"
              alt="a4blogo"
              width={80}
              height={80}
              src={require("../../media/ai4bharatlogo.png")}
            ></img>
            <span className="orange-color">AI4Bharat </span>
            Indic Named Entity Recognition (NER)
          </h1>
          <p className="subtitle">
            Try out Named Entity Recognition across 11 Indian Languages!
          </p>
        </section>

        <div className="common-options">
          <label className="a4b-option">
            Language:
            <Select
              MenuProps={{
                disableScrollLock: true,
                PaperProps: {
                  style: {
                    maxHeight: "250px",
                    borderRadius: "8px",
                    width: "250px", // Set the width of the dropdown
                  },
                },
              }}
              value={this.state.languageChoice}
              onChange={(e) => {
                this.setState({ languageChoice: e.target.value });
                localStorage.setItem("ttsLanguageChoice", e.target.value);
              }}
              sx={{
                borderRadius: "8px",

                width: "260px",
              }}
              className="a4b-option-select"
            >
              {Object.entries(this.languages).map(([language, optionText]) => {
                return (
                  <MenuItem
                    key={language}
                    sx={{
                      margin: 1,
                      minHeight: "auto",
                      border: "2px solid #d7d7d7",
                      borderRadius: "9px",
                    }}
                    value={language}
                  >
                    {optionText}
                  </MenuItem>
                );
              })}
            </Select>
          </label>
          <label className="a4b-option">
            Enable Transliteration:
            <Switch
              checked={this.state.enableTransliteration}
              onChange={this.toggleTransliteration}
              inputProps={{ "aria-label": "controlled" }}
            />
          </label>
        </div>
        <div className="a4b-interface">
          <div className="a4b-output-grid">
            <div className="a4b-transliterate-container">
              <Tooltip
                placement="top-start"
                title={
                  "You can choose your suggestion using Arrow Keys or Scroll using the mouse and then either use Space or Click on the word suggestion to apply that word."
                }
              >
                <IndicTransliterate
                  className="a4b-transliterate-text"
                  renderComponent={(props) => <textarea {...props} />}
                  enabled={
                    this.state.languageChoice !== "en" &&
                    this.state.enableTransliteration
                  }
                  value={this.state.transliteratedText}
                  placeholder="Type your text here to convert...."
                  onChangeText={(text) => {
                    this.setState({ transliteratedText: text });
                  }}
                  lang={this.state.languageChoice}
                />
              </Tooltip>
            </div>
            <div className="a4b-nmt-buttons">
              <Button
                onClick={() => {
                  this.getNER();
                }}
                sx={{
                  backgroundColor: "#f06b42",
                  borderRadius: 15,
                  padding: "15px 32px",
                  ":hover": { backgroundColor: "#f06b42" },
                  margin: 2.5,
                }}
                variant="contained"
              >
                Generate
              </Button>
            </div>
            <div className="a4b-ner-output">
              <NEROutput data={this.state.nerOutput} />
            </div>
          </div>
          <Documentation documentation={nerDocumentation} />
        </div>
      </>
    );
  }
}
