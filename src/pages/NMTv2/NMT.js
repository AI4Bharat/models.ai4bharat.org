import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Snackbar,
  Switch,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { FeedbackModal } from "../../components/Feedback/Feedback";
import QuickFeedback from "../../components/Feedback/QuickFeedback";
import languages from "./languages_dict.json";

export default class NMTV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // conversion: "en-hi",
      transliteratedText: "",
      translatedText: "",
      pipelineInput: null,
      pipelineOutput: null,
      isFetching: false,
      dataTracking: true,
      // nmtLanguages: [],
      open: false,
      languages_dict: [],
      targetLanguage: "hi",
      sourceLanguage: "en",
    };

    this.languages = {
      as: "Assamese",
      awa: "Awadhi",
      bho: "Bhojpuri",
      bn: "Bangla",
      brx: "Boro",
      doi: "Dogri",
      en: "English",
      gom: "Goan-Konkani",
      gu: "Gujarati",
      hi: "Hindi",
      hne: "Hindi-Eastern (Chhattisgarhi)",
      kn: "Kannada",
      ks: "Kashmiri (Arabic)",
      ks_Deva: "Kashmiri (Devanagari)",
      kha: "Khasi",
      lus: "Lushai (Mizo)",
      mag: "Magahi",
      mai: "Maithili",
      ml: "Malayalam",
      mni: "Manipuri (Meitei)",
      mni_Beng: "Manipuri (Bengali)",
      mr: "Marathi",
      ne: "Nepali",
      or: "Oriya",
      pa: "Panjabi",
      raj: "Rajasthani",
      sa: "Sanskrit",
      sat: "Santali",
      sd: "Sindhi (Arabic)",
      sd_Deva: "Sindhi (Devanagari)",
      si: "Sinhala",
      ta: "Tamil",
      te: "Telugu",
      ur: "Urdu",
    };

    this.sortedLanguages = {};

    this.getTranslation = this.getTranslation.bind(this);
  }
  fetchNMTLanguages() {
    const _this = this;
    _this.setState({ languages_dict: languages });
    // fetchLanguages().then((response) => {
    //   _this.setState({ nmtLanguages: response["indicTransV2"]});
    //   _this.setState({languges_dict : response["indicTransV2"]});
    // });
  }
  componentWillMount() {
    const _this = this;
    const languages = Object.keys(_this.languages);
    languages.sort();
    languages.forEach((key) => {
      _this.sortedLanguages[key] = _this.languages[key];
    });
    _this.fetchNMTLanguages();
  }

  setTransliteratedText(text) {
    this.setState({ transliteratedText: text });
  }

  languageScriptParser(input) {
    let lang = input;
    if (lang.includes("_")) {
      lang = lang.split("_")[0];
    }
    return lang;
  }

  isLanguageScriptCodePresent(input) {
    let lang = input;
    if (lang.includes("_")) {
      return true;
    }
    return false;
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
                sourceLanguage: this.languageScriptParser(
                  _this.state.sourceLanguage
                ),
                targetLanguage: this.languageScriptParser(
                  _this.state.targetLanguage
                ),
                targetScriptCode: this.isLanguageScriptCodePresent(
                  _this.state.targetLanguage
                )
                  ? _this.state.targetLanguage.split("_")[1]
                  : null,
                sourceScriptCode: this.isLanguageScriptCodePresent(
                  _this.state.sourceLanguage
                )
                  ? _this.state.sourceLanguage.split("_")[1]
                  : null,
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
    let apiURL = `${process.env.REACT_APP_BACKEND_URL}/inference/translation/v2`;
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
            sourceLanguage: this.languageScriptParser(
              _this.state.sourceLanguage
            ),
            targetLanguage: this.languageScriptParser(
              _this.state.targetLanguage
            ),
            targetScriptCode: this.isLanguageScriptCodePresent(
              _this.state.targetLanguage
            )
              ? _this.state.targetLanguage.split("_")[1]
              : null,
            sourceScriptCode: this.isLanguageScriptCodePresent(
              _this.state.sourceLanguage
            )
              ? _this.state.sourceLanguage.split("_")[1]
              : null,
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
      return;
    }
    this.setState({ open: false });
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
              Select Source Language:
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                sx={{ borderRadius: 15 }}
                className="a4b-option-select"
                value={this.state.sourceLanguage}
                onChange={(e) => {
                  this.setState({ sourceLanguage: e.target.value });
                }}
              >
                {this.state.languages_dict.map((data, index) => {
                  return (
                    <MenuItem
                      key={data.sourceLanguage}
                      sx={{ margin: 1 }}
                      value={data.sourceLanguage}
                    >
                      {this.languages[data.sourceLanguage]}
                    </MenuItem>
                  );
                })}
              </Select>
            </label>

            <label className="a4b-option">
              Select Target Language:
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                sx={{ borderRadius: 15 }}
                className="a4b-option-select"
                value={this.state.targetLanguage}
                onChange={(e) => {
                  this.setState({ targetLanguage: e.target.value });
                }}
              >
                {this.state.languages_dict
                  .find((n, index) => {
                    return n.sourceLanguage === this.state.sourceLanguage;
                  })
                  ["targetLanguages"].map((data, index) => {
                    return (
                      <MenuItem key={data} sx={{ margin: 1 }} value={data}>
                        {this.languages[data]}
                      </MenuItem>
                    );
                  })}
              </Select>
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
                <IndicTransliterate
                  className="a4b-transliterate-text"
                  enabled={this.state.sourceLanguage !== "en"}
                  renderComponent={(props) => <textarea {...props} />}
                  value={this.state.transliteratedText}
                  placeholder="Type your text here to Translate...."
                  onChangeText={(text) => {
                    this.setTransliteratedText(text);
                  }}
                  lang={this.state.sourceLanguage}
                />
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
