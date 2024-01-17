import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { Button, Switch, Tooltip } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { FaRegCopy } from "react-icons/fa";
import Documentation from "../../components/A4BDocumentation/Documentation";
import { nlgDocumentation } from "./nlgDocumentation";

export default class NLG extends React.Component {
  constructor(props) {
    super(props);

    this.apiURL = "https://hf.space/embed/ai4bharat/IndicNLG/+/api/predict/";

    this.state = {
      languageChoice: localStorage.getItem("nlgLanguageChoice"),
      task: localStorage.getItem("nlgTaskChoice"),
      transliteratedText: "",
      generatedText: "",
      isFetching: false,
      enableTransliteration: true,
    };

    this.languages = {
      hi: ["Hindi - हिंदी", "Hindi"],
      mr: ["Marathi - मराठी", "Marathi"],
      as: ["Assamese - অসমীয়া", "Assamese"],
      gu: ["Gujarati - ગુજરાતી", "Gujarati"],
      kn: ["Kannada - ಕನ್ನಡ", "Kannada"],
      ml: ["Malayalam - മലയാളം", "Malayalam"],
      or: ["Odia - ଓଡ଼ିଆ", "Odia"],
      pa: ["Punjabi - ਪੰਜਾਬੀ", "Punjabi"],
      ta: ["Tamil - தமிழ்", "Tamil"],
      te: ["Telugu - తెలుగు", "Telugu"],
      bn: ["Bangla - বাংলা", "Bengali"],
    };

    this.tasks = [
      "IndicWikiBio",
      "IndicHeadlineGeneration",
      "IndicParaphrasing",
      "IndicSentenceSummarization",
      "IndicQuestionGeneration",
    ];

    this.sortedLanguages = {};
    this.toggleTransliteration = this.toggleTransliteration.bind(this);
  }

  componentWillMount() {
    const _this = this;
    const languages = Object.keys(_this.languages);
    languages.sort();
    languages.forEach((key) => {
      _this.sortedLanguages[key] = _this.languages[key];
    });
  }

  toggleTransliteration() {
    this.setState({ enableTransliteration: !this.state.enableTransliteration });
  }

  getGeneratedText() {
    const _this = this;
    _this.setState({ isFetching: true });
    fetch(_this.apiURL, {
      method: "POST",
      body: JSON.stringify({
        data: [
          _this.state.transliteratedText,
          _this.state.task,
          this.languages[_this.state.languageChoice][1],
        ],
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json_response) {
        _this.setState({
          generatedText: json_response.data[0],
          isFetching: false,
        });
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
              width={80}
              height={80}
              src={require("../../media/ai4bharatlogo.png")}
            ></img>
            <span className="orange-color">AI4Bharat </span>
            Indic Natural Language Generation (NLG)
          </h1>
          <p className="subtitle">
            Generate text in real-time across various Indian Languages.
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
                    maxHeight: "350px",
                    borderRadius: "8px",
                    width: "200px",
                    padding: "3px",
                    // Set the width of the dropdown
                    right: "-9px",
                  },
                },
              }}
              sx={{
                borderRadius: "8px",

                width: "260px",
              }}
              className="a4b-option-select"
              value={this.state.languageChoice}
              onChange={(e) => {
                this.setState({ languageChoice: e.target.value });

                localStorage.setItem("nlgLanguageChoice", e.target.value);
              }}
            >
              {Object.entries(this.sortedLanguages).map(
                ([language, optionText]) => {
                  return (
                    <MenuItem
                      key={language}
                      sx={{
                        margin: 1,
                        border: "2px solid #d7d7d7",
                        borderRadius: 3,
                      }}
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
            Task:
            <Select
              MenuProps={{
                disableScrollLock: true,
                PaperProps: {
                  style: {
                    maxHeight: "350px",
                    borderRadius: "8px",
                    width: "200px",
                    padding: "3px",
                    // Set the width of the dropdown
                    right: "-9px",
                  },
                },
              }}
              sx={{
                borderRadius: "8px",

                width: "260px",
              }}
              className="a4b-option-select"
              value={this.state.task}
              onChange={(e) => {
                this.setState({ task: e.target.value });
                localStorage.setItem("nlgTaskChoice", e.target.value);
              }}
            >
              {this.tasks.map((task) => {
                return (
                  /*i have updated here*/
                  <MenuItem
                    key={task}
                    sx={{
                      margin: 1,
                      border: "2px solid #d7d7d7",
                      borderRadius: 3,
                    }}
                    value={task}
                  >
                    {task}
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
          {this.showProgress()}
          <div className="a4b-output-grid">
            <div className="a4b-output">
              <Tooltip
                placement="top-start"
                title={
                  "You can choose your suggestion using Arrow Keys or Scroll using the mouse and then either use Space or Click on the word suggestion to apply that word."
                }
              >
                <div className="a4b-transliterate-container">
                  <IndicTransliterate
                    renderComponent={(props) => (
                      <textarea className="a4b-transliterate-text" {...props} />
                    )}
                    enabled={
                      this.state.from !== "en" &&
                      this.state.enableTransliteration
                    }
                    value={this.state.transliteratedText}
                    placeholder="Type your text here...."
                    onChangeText={(text) => {
                      this.setState({ transliteratedText: text });
                    }}
                    lang={this.state.languageChoice}
                  />
                </div>
              </Tooltip>
            </div>
            <div className="a4b-nmt-buttons">
              <Button
                onClick={() => {
                  this.getGeneratedText();
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
                  if (this.state.generatedText) {
                    navigator.clipboard.writeText(this.state.generatedText);
                  }
                }}
              >
                <FaRegCopy size={"20px"} />
              </Button>
            </div>
            <textarea
              value={this.state.generatedText}
              placeholder="View Generated Text here....."
              className="a4b-output-text"
              readOnly
              style={{ width: "100%", minHeight: "100px" }}
            />
          </div>
          <Documentation documentation={nlgDocumentation} />
        </div>
      </div>
    );
  }
}
