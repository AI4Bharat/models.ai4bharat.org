import {
  IndicTransliterate,
  TriggerKeys,
} from "@ai4bharat/indic-transliterate";
import Button from "@mui/material/Button";
import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import { FeedbackModal } from "../../components/Feedback/Feedback.jsx";

import {
  FormControl,
  FormLabel,
  Grid,
  Switch,
  Tooltip,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { io } from "socket.io-client";
import QuickFeedback from "../../components/Feedback/QuickFeedback.jsx";

export default class TTS extends React.Component {
  constructor(props) {
    super(props);

    this.ttsURL = `${process.env.REACT_APP_BACKEND_URL}/inference/tts`;

    this.modes = {
      REST: "REST (API)",
      // WebSocket: "Streaming (WebSocket)",
    };

    this.state = {
      languageChoice: localStorage.getItem("ttsLanguageChoice"),
      voiceGender: localStorage.getItem("ttsVoiceGender"),
      transliteratedText: "",
      streamingText: "",
      dataTracking: true,
      audioComponent: null,
      streamingAudio: null,
      audioHidden: true,
      isFetching: false,
      pipelineInput: null,
      pipelineOutput: null,
      inferenceMode: "REST",
      enableTransliteration: true,
      openLimit: false,
    };

    this.languages = {
      en: "Indian-English",
      as: "Assamese - অসমীয়া",
      bn: "Bangla - বাংলা",
      brx: "Boro - बड़ो",
      gu: "Gujarati - ગુજરાતી",
      hi: "Hindi - हिंदी",
      kn: "Kannada - ಕನ್ನಡ",
      ml: "Malayalam - മലയാളം",
      mni: "Manipuri - মণিপুরী/ꯃꯩꯇꯩꯂꯣꯟ",
      mr: "Marathi - मराठी",
      or: "Odia - ଓଡ଼ିଆ",
      pa: "Panjabi - ਪੰਜਾਬੀ",
      raj: "Rajasthani - राजस्थानी",
      ta: "Tamil - தமிழ்",
      te: "Telugu - తెలుగు",
    };

    this.getAudioOutput = this.getAudioOutput.bind(this);
    this.toggleTransliteration = this.toggleTransliteration.bind(this);
  }

  toggleTransliteration() {
    this.setState({ enableTransliteration: !this.state.enableTransliteration });
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      this.setState({ openLimit: false });
      return;
    }
    this.setState({ openLimit: false });
  }

  getAudioOutput() {
    this.setState({ isFetching: true });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      controlConfig: {
        dataTracking: this.state.dataTracking,
      },
      input: [
        {
          source: this.state.transliteratedText,
        },
      ],
      config: {
        gender: this.state.voiceGender,
        language: {
          sourceLanguage: this.state.languageChoice,
        },
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    };

    fetch(this.ttsURL, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        var apiResult = JSON.parse(result);
        var audioContent = apiResult["audio"][0]["audioContent"];
        var audio = "data:audio/wav;base64," + audioContent;
        this.setState({
          isFetching: false,
          audioComponent: audio,
          audioHidden: false,
          pipelineInput: {
            pipelineTasks: [
              {
                config: {
                  gender: this.state.voiceGender,
                  language: {
                    sourceLanguage: this.state.languageChoice,
                  },
                  samplingRate: this.state.samplingRate,
                  audioFormat: this.state.audioFormat,
                },
                taskType: "tts",
              },
            ],
            inputData: {
              input: [
                {
                  source: this.state.transliteratedText,
                },
              ],
            },
          },
          pipelineOutput: {
            pipelineResponse: [
              {
                taskType: "tts",
                audio: result["audio"],
              },
            ],
          },
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

  getStreamingOutput(e) {
    const SOCKET_URL = "wss://tts-api.ai4bharat.org/tts";
    var socket_tts = io(SOCKET_URL, {
      path: "/tts_socket.io",
      transport: ["websocket"],
      upgrade: false,
    });
    if (e.key === " ") {
      this.request = {
        input: [
          {
            source: this.state.streamingText,
          },
        ],
        config: {
          gender: this.state.voiceGender,
          language: {
            sourceLanguage: this.state.languageChoice,
          },
        },
      };
      this.setState({ isFetching: true });
      socket_tts.emit("infer", this.request, (response) => {
        if (response["audio"]) {
          let arrayString =
            "data:audio/wav;base64," + response["audio"][0]["audioContent"];
          this.setState({
            isFetching: false,
            streamingAudio: arrayString,
            audioHidden: false,
          });
          var ttsStreamingAudio = new Audio(arrayString);
          ttsStreamingAudio.play();
        }
      });
    }
  }

  setInferenceInterface() {
    const _this = this;
    if (_this.state.inferenceMode === "REST") {
      return (
        <div className="a4b-interface">
          {this.showProgress()}
          <div className="a4b-output">
            <Tooltip
              placement="top-start"
              title={
                "You can choose your suggestion using Arrow Keys or Scroll using the mouse and then either use Space or Click on the word suggestion to apply that word."
              }
            >
              <div className="a4b-transliterate-container">
                <IndicTransliterate
                  enabled={
                    this.state.from !== "en" && this.state.enableTransliteration
                  }
                  renderComponent={(props) => (
                    <>
                      <textarea className="a4b-transliterate-text" {...props} />
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
                        {_this.state.transliteratedText.length}/512
                      </span>
                    </>
                  )}
                  value={this.state.transliteratedText}
                  placeholder="Type your text here to convert...."
                  onChangeText={(text) => {
                    this.setState({ transliteratedText: text });
                  }}
                  lang={this.state.languageChoice}
                />
              </div>
            </Tooltip>
          </div>

          <Grid
            container
            spacing={this.state.pipelineOutput ? 30 : 0}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid item>
              <div className="a4b-tts-convert">
                <button
                  onClick={() => {
                    // if((this.state.streamingText.length <= 512 && _this.state.inferenceMode === "WebSocket")||(this.state.transliteratedText.length <= 512 && _this.state.transliteratedText === "REST"))
                    if (this.state.transliteratedText.length <= 512) {
                      this.getAudioOutput();
                    } else {
                      this.setState({ openLimit: true });
                    }
                  }}
                  className="asr-button"
                >
                  Convert
                </button>
                {this.state.isFetching ? (
                  <Skeleton
                    sx={{ height: 80, width: 300, bgcolor: "#fbdad0" }}
                  />
                ) : (
                  <audio
                    hidden={this.state.audioHidden}
                    src={this.state.audioComponent}
                    controls
                  />
                )}
              </div>
              <FormControl
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormLabel className="custom-form-label">
                  Allow the AI to be improved by usage analysis.
                </FormLabel>
                <Switch
                  checked={this.state.dataTracking}
                  onChange={(e) =>
                    this.setState({ dataTracking: e.target.checked })
                  }
                />
              </FormControl>
              {/* <Documentation documentation={ttsDocumentation} /> */}
            </Grid>
            <Grid item>
              {this.state.pipelineOutput && (
                <QuickFeedback
                  pipelineInput={this.state.pipelineInput}
                  pipelineOutput={this.state.pipelineOutput}
                  taskType="tts"
                />
              )}

              {this.state.pipelineOutput && (
                <FeedbackModal
                  pipelineInput={this.state.pipelineInput}
                  pipelineOutput={this.state.pipelineOutput}
                  taskType="tts"
                  link
                />
              )}
            </Grid>
          </Grid>
        </div>
      );
    } else if (_this.state.inferenceMode === "WebSocket") {
      return (
        <div classname="a4b-interface">
          {this.showProgress()}
          <div className="a4b-output">
            <div className="a4b-transliterate-container">
              <Tooltip
                placement="top-start"
                title={
                  "You can choose your suggestion using Arrow Keys or Scroll using the mouse and then either use Space or Click on the word suggestion to apply that word."
                }
              >
                <IndicTransliterate
                  onKeyUp={(e) => {
                    _this.getStreamingOutput(e);
                  }}
                  renderComponent={(props) => (
                    <>
                      <textarea className="a4b-transliterate-text" {...props} />
                      <TextField
                        float={"right"}
                        fontSize={"sm"}
                        color={
                          this.state.streamingText.length <= 512
                            ? "#d7d7d7"
                            : "red"
                        }
                      >
                        {this.state.streamingText.length}/512
                      </TextField>
                    </>
                  )}
                  enabled={
                    this.state.from !== "en" && this.state.enableTransliteration
                  }
                  value={_this.state.streamingText}
                  placeholder="Type your text here to convert...."
                  onChangeText={(text) => {
                    _this.setState({ streamingText: text });
                  }}
                  lang={_this.state.languageChoice}
                />
              </Tooltip>
            </div>
          </div>
          <div className="a4b-tts-convert">
            {_this.state.isFetching ? (
              <Skeleton sx={{ height: 80, width: 300, bgcolor: "#fbdad0" }} />
            ) : (
              <audio
                id="a4b-tts-streaming"
                hidden={_this.state.audioHidden}
                src={_this.state.streamingAudio}
                controls
              />
            )}
          </div>
        </div>
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
            Indic Text-to-Speech (TTS)
          </h1>
          <p className="subtitle">
            Convert text to speech in real-time across various Indian Languages!
            <Button
              color="warning"
              component={Link}
              to={`/tts/samples`}
              sx={{
                height: 50,
                margin: 2,
                width: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "row",
              }}
              size="small"
            >
              <FaLaptopCode style={{ margin: 5 }} size={30} />
            </Button>
          </p>
        </section>
        <hr className="hr-split" />
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
                    sx={{
                      margin: 1,
                      border: "2px solid #d7d7d7",
                      borderRadius: "6px",
                    }}
                    key={language}
                    value={language}
                  >
                    {optionText}
                  </MenuItem>
                );
              })}
            </Select>
          </label>
          <label className="a4b-option">
            Interface Type:
            <Select
              MenuProps={{
                disableScrollLock: true,
              }}
              value={this.state.inferenceMode}
              onChange={(e) => {
                this.setState({
                  inferenceMode: e.target.value,
                  transliteratedText: null,
                  streamingText: null,
                });
              }}
              sx={{
                borderRadius: "8px",

                width: "260px",
              }}
              className="a4b-option-select"
            >
              {Object.entries(this.modes).map(([language, optionText]) => {
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
            Voice:
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
              value={this.state.voiceGender}
              onChange={(e) => {
                this.setState({ voiceGender: e.target.value });
                localStorage.setItem("ttsVoiceGender", e.target.value);
              }}
              sx={{
                borderRadius: "8px",

                width: "260px",
              }}
              className="a4b-option-select"
            >
              <MenuItem
                sx={{
                  margin: 1,
                  minHeight: "auto",
                  border: "2px solid #d7d7d7",
                  borderRadius: "9px",
                }}
                value={"male"}
              >
                Male
              </MenuItem>
              <MenuItem
                sx={{
                  margin: 1,
                  minHeight: "auto",
                  border: "2px solid #d7d7d7",
                  borderRadius: "9px",
                }}
                value={"female"}
              >
                Female
              </MenuItem>
            </Select>
          </label>
          <label className="a4b-option">
            <span className="a4b-option-label">Enable Transliteration:</span>
            <div className="a4b-enable-transliteration">
              <span className="a4b-enable-transliteration-label">No</span>
              <Switch
                checked={this.state.enableTransliteration}
                onChange={this.toggleTransliteration}
                inputProps={{ "aria-label": "controlled" }}
              />
              <span className="a4b-enable-transliteration-label">Yes</span>
            </div>
          </label>
        </div>
        {this.setInferenceInterface()}
        <Snackbar
          open={this.state.openLimit}
          autoHideDuration={3000}
          onClose={() => this.handleClose()}
        >
          <Alert
            onClose={() => this.handleClose()}
            severity="error"
            sx={{ width: "100%" }}
          >
            Character Limit Exceeded
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
