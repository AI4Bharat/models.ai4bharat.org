import {
  IndicTransliterate,
  TriggerKeys,
} from "@ai4bharat/indic-transliterate";
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Snackbar,
  Switch,
  Tooltip,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { FeedbackModal } from "../../components/Feedback/Feedback";
import QuickFeedback from "../../components/Feedback/QuickFeedback";

export default class NMT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: localStorage.getItem("nmtLanguageFrom"),
      to: localStorage.getItem("nmtLanguageTo"),
      transliteratedText: "",
      translatedText: "",
      pipelineInput: null,
      dataTracking: true,
      pipelineOutput: null,
      isFetching: false,
      openLimit: false,
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
      en: ["English - English", "English"],
    };

    this.sortedLanguages = {};

    this.getTranslation = this.getTranslation.bind(this);
    this.toggleTransliteration = this.toggleTransliteration.bind(this);
  }

  toggleTransliteration() {
    this.setState({ enableTransliteration: !this.state.enableTransliteration });
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
        inputData: {
          input: [{ source: _this.state.transliteratedText }],
        },
      },
    });
    let apiURL = `${process.env.REACT_APP_BACKEND_URL}/inference/translation/v1`;
    fetch(apiURL, {
      method: "POST",
      body: JSON.stringify({
        controlConfig: {
          dataTracking: _this.state.dataTracking,
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

  handleClose(event, reason) {
    if (reason === "clickaway") {
      this.setState({ open: false });
      return;
    }
    this.setState({ open: false });
  }

  handleCloseLimit(event, reason) {
    if (reason === "clickaway") {
      this.setState({ openLimit: false });
      return;
    }
    this.setState({ openLimit: false });
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
            Indic Translation (NMT)
          </h1>
          <p className="subtitle">
            Translate in real-time across various Indian Languages!
          </p>
        </section>

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
            <Grid container spacing={2}>
              <Grid
                item
                md={6}
                xs={12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <div className="a4b-transliterate-container">
                  <Tooltip
                    placement="top-start"
                    title={
                      "You can choose your suggestion using Arrow Keys or Scroll using the mouse and then either use Space or Click on the word suggestion to apply that word."
                    }
                  >
                    <IndicTransliterate
                      className="a4b-transliterate-text"
                      enabled={
                        this.state.from !== "en" &&
                        this.state.enableTransliteration
                      }
                      renderComponent={(props) => (
                        <>
                          <textarea
                            className="a4b-transliterate-text"
                            {...props}
                          />
                          <span
                            style={{
                              float: "right",
                              fontSize: "small",
                              color:
                                this.state.transliteratedText.length <= 512
                                  ? "#d7d7d7"
                                  : "red",
                            }}
                          >
                            {this.state.transliteratedText.length}/512
                          </span>
                        </>
                      )}
                      value={this.state.transliteratedText}
                      placeholder="Type your text here to Translate...."
                      onChangeText={(text) => {
                        this.setTransliteratedText(text);
                      }}
                      lang={this.state.from}
                    />
                  </Tooltip>
                </div>
                <Button
                  onClick={() => {
                    if (this.state.transliteratedText.length <= 512) {
                      this.getTranslation();
                    } else {
                      this.setState({ openLimit: true });
                    }
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
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormLabel>
                    Allow the AI to be improved by usage analysis.
                  </FormLabel>
                  <Switch
                    checked={this.state.dataTracking}
                    onChange={(e) =>
                      this.setState({ dataTracking: e.target.checked })
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <div style={{ position: "relative" }}>
                  <textarea
                    value={this.state.translatedText}
                    placeholder="View Translated Output here....."
                    className="a4b-transliterate-text"
                    readOnly
                  />
                  <Button
                    sx={{
                      color: "black",
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                    size="large"
                    variant="text"
                    disabled={!this.state.translatedText}
                    onClick={() => {
                      if (this.state.translatedText) {
                        navigator.clipboard.writeText(
                          this.state.translatedText
                        );
                        this.setState({ open: true });
                      }
                    }}
                  >
                    <FaRegCopy size={"20px"} />
                  </Button>
                </div>

                <Snackbar
                  open={this.state.open}
                  autoHideDuration={6000}
                  onClose={() => this.handleClose()}
                >
                  <Alert
                    onClose={() => this.handleClose()}
                    severity="info"
                    sx={{ width: "100%" }}
                  >
                    Translation Copied to Clipboard!
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={this.state.openLimit}
                  autoHideDuration={3000}
                  onClose={() => this.handleCloseLimit()}
                >
                  <Alert
                    onClose={() => this.handleCloseLimit()}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Character Limit Exceeded
                  </Alert>
                </Snackbar>
                {this.state.pipelineOutput && (
                  <QuickFeedback
                    pipelineInput={this.state.pipelineInput}
                    pipelineOutput={this.state.pipelineOutput}
                    taskType="translation"
                  />
                )}

                {this.state.pipelineOutput && (
                  <FeedbackModal
                    pipelineInput={this.state.pipelineInput}
                    pipelineOutput={this.state.pipelineOutput}
                    taskType="translation"
                    link
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </>
      </div>
    );
  }
}
