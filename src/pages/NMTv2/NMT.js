import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import Documentation from "../../components/A4BDocumentation/Documentation";
import { nmtDocumentation } from "./nmtDocumentation";
import { FaRegCopy } from "react-icons/fa";
import LinearProgress from "@mui/material/LinearProgress";
import { FeedbackModal } from "../../components/Feedback/Feedback";
import { fetchLanguages } from "../../api/feedbackAPI";
import QuickFeedback from "../../components/Feedback/QuickFeedback";

export default class NMTV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversion: "en-hi",
      transliteratedText: "",
      translatedText: "",
      pipelineInput: null,
      pipelineOutput: null,
      isFetching: false,
      nmtLanguages: [],
      open: false,
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
      ks: "Kashmiri",
      ks_Deva: "Kashmiri (Devanagari)",
      kha: "Khasi",
      lus: "Lushai (Mizo)",
      mag: "Magahi",
      mai: "Maithili",
      ml: "Malayalam",
      mni: "Manipuri",
      mni_Beng: "Manipuri (Bengali)",
      mr: "Marathi",
      ne: "Nepali",
      or: "Oriya",
      pa: "Panjabi",
      raj: "Rajasthani",
      sa: "Sanskrit",
      sat: "Santali",
      sd: "Sindhi",
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
    fetchLanguages().then((response) => {
      _this.setState({ nmtLanguages: response["indicTransV2"] });
    });
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

  getTranslation() {
    const _this = this;
    _this.setState({ isFetching: true });
    _this.setState({
      pipelineInput: {
        pipelineTasks: [
          {
            config: {
              language: {
                sourceLanguage: _this.state.conversion.split("-")[0],
                targetLanguage: _this.state.conversion.split("-")[1],
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
          dataTracking: true,
        },
        input: [{ source: _this.state.transliteratedText }],

        config: {
          serviceId: "",
          language: {
            sourceLanguage: _this.state.conversion.split("-")[0],
            targetLanguage: _this.state.conversion.split("-")[1],
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
              Select Language:
              <Select
                MenuProps={{
                  disableScrollLock: true,
                }}
                sx={{ borderRadius: 15 }}
                className="a4b-option-select"
                value={this.state.conversion}
                onChange={(e) => {
                  this.setState({ conversion: e.target.value });
                }}
              >
                {this.state.nmtLanguages.map((data, index) => {
                  return (
                    <MenuItem
                      key={data.sourceLanguage + "-" + data.targetLanguage}
                      sx={{ margin: 1 }}
                      value={data.sourceLanguage + "-" + data.targetLanguage}
                    >
                      {this.languages[data.sourceLanguage] +
                        " -> " +
                        this.languages[data.targetLanguage]}
                    </MenuItem>
                  );
                })}
              </Select>
            </label>
          </div>
          <div className="a4b-interface">
            {this.showProgress()}
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <IndicTransliterate
                  className="a4b-transliterate-text"
                  enabled={this.state.conversion.split("-")[0] !== "en"}
                  renderComponent={(props) => <textarea {...props} />}
                  value={this.state.transliteratedText}
                  placeholder="Type your text here to transliterate...."
                  onChangeText={(text) => {
                    this.setTransliteratedText(text);
                  }}
                  lang={this.state.from}
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
              </Grid>
              <Grid item md={6} xs={12}>
                <textarea
                  value={this.state.translatedText}
                  placeholder="View Translated Input here....."
                  className="a4b-transliterate-text"
                  readOnly
                />

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
                      this.setState({ open: true });
                    }
                  }}
                >
                  <FaRegCopy size={"20px"} />
                </Button>
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
