import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { Button } from "@mui/material";
import Documentation from "../../components/A4BDocumentation/Documentation";
import { nmtDocumentation } from "./nmtDocumentation";
import { FaRegCopy } from "react-icons/fa";
import LinearProgress from "@mui/material/LinearProgress";
import { FeedbackModal } from "../../components/Feedback/Feedback";

export default class NMTV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: localStorage.getItem("nmtLanguageFrom"),
      to: localStorage.getItem("nmtLanguageTo"),
      transliteratedText: "",
      translatedText: "",
      pipelineInput: null,
      pipelineOutput: null,
      isFetching: false,
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
      en: ["English - English", "English"],
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
    _this.setState({ isFetching: true });
    _this.setState({
      pipelineInput: {
        pipelineTasks: [
          {
            config: {
              language: {
                sourceLanguage: _this.state.from,
                targetLanguage: _this.state.to,
              },
            },
            taskType: "translation",
          },
        ],
        inputData:
          {
            input: [{ source: _this.state.transliteratedText }],
          },
      },
    });
    let apiURL = `${process.env.REACT_APP_BACKEND_URL}/inference/translation/v1`;
    fetch(apiURL, {
      method: "POST",
      body: JSON.stringify({
        controlConfig: {
          dataTracking: true,
        },
        input: [{ source: _this.state.transliteratedText }],

        config: {
          serviceId: "",
          language: {
            sourceLanguage: _this.state.from,
            targetLanguage: _this.state.to,
          },
        },
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (response) {
        let res = JSON.parse(response);
        _this.setState({
          pipelineOutput: {
            pipelineResponse: [
              {
                taskType: "translation",
                output: res["output"],
              },
            ],
          },
          translatedText: res["output"][0]["target"],
          isFetching: false,
        });
        return res;
      });
  }

  showProgress() {
    if (this.state.isFetching) {
      return (
        <LinearProgress
          sx={{
            backgroundColor: "#fbdad0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#f06b42",
            },
            margin: 5,
          }}
        />
      );
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
            Indic Translation (NMT)
          </h1>
          <p className="subtitle">
            Translate in real-time across various Indian Languages!
          </p>
        </section>
        <hr className="hr-split" />
        <>
          <div className="common-options">
            <label className="a4b-option">
              From:
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                sx={{ borderRadius: 15 }}
                className="a4b-option-select"
                value={this.state.from}
                onChange={(e) => {
                  this.setState({ from: e.target.value });
                  localStorage.setItem("nmtLanguageFrom", e.target.value);
                }}
              >
                {Object.entries(this.sortedLanguages).map(
                  ([language, optionText]) => {
                    return (
                      <MenuItem
                        key={language}
                        sx={{ margin: 1 }}
                        value={language}
                      >
                        {optionText[0]}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </label>
            <label className="a4b-option">
              To:
              <Select
                className="a4b-option-select"
                value={this.state.to}
                sx={{ borderRadius: 15 }}
                MenuProps={{
                  disableScrollLock: true,
                }}
                onChange={(e) => {
                  this.setState({ to: e.target.value });
                  localStorage.setItem("nmtLanguageTo", e.target.value);
                }}
              >
                {Object.entries(this.sortedLanguages).map(
                  ([language, optionText]) => {
                    return (
                      <MenuItem
                        key={language}
                        sx={{ margin: 1 }}
                        value={language}
                      >
                        {optionText[0]}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </label>
          </div>
          <div className="a4b-interface">
            {this.showProgress()}
            <div className="a4b-output-grid">
              <div className="a4b-output">
                <div className="a4b-transliterate-container">
                  <IndicTransliterate
                    className="a4b-transliterate-text"
                    enabled={this.state.from !== "en"}
                    renderComponent={(props) => <textarea {...props} />}
                    value={this.state.transliteratedText}
                    placeholder="Type your text here to transliterate...."
                    onChangeText={(text) => {
                      this.setTransliteratedText(text);
                    }}
                    lang={this.state.from}
                  />
                </div>
              </div>
              <div className="a4b-nmt-buttons">
                <Button
                  onClick={() => {
                    this.getTranslation();
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
                  Translate
                </Button>
                <Button
                  sx={{
                    width: 10,
                    height: 50,
                    color: "#4a4a4a",
                    borderColor: "#4a4a4a",
                  }}
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    if (this.state.translatedText) {
                      navigator.clipboard.writeText(this.state.translatedText);
                    }
                  }}
                >
                  <FaRegCopy size={"20px"} />
                </Button>
              </div>
              <textarea
                value={this.state.translatedText}
                placeholder="View Translated Input here....."
                className="a4b-transliterate-text"
                readOnly
              />
            </div>
            <Documentation documentation={nmtDocumentation} />
            {this.state.pipelineOutput && (
              <FeedbackModal
                pipelineInput={this.state.pipelineInput}
                pipelineOutput={this.state.pipelineOutput}
                taskType="translation"
              />
            )}
          </div>
        </>
      </div>
    );
  }
}
