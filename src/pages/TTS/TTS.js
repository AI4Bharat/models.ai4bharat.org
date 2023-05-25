import React from "react";
import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import Button from "@mui/material/Button";
import { FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import { FeedbackModal } from "../../components/Feedback/Feedback.jsx";
import { ttsDocumentation } from "./ttsDocumentation";
import Documentation from "../../components/A4BDocumentation/Documentation";

import { io } from "socket.io-client";

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
      audioComponent: null,
      streamingAudio: null,
      audioHidden: true,
      isFetching: false,
      pipelineInput: null,
      pipelineOutput: null,
      inferenceMode: "REST",
    };

    this.languages = {
      as: "Assamese - অসমীয়া",
      bn: "Bangla - বাংলা",
      brx: "Boro - बड़ो",
      gu: "Gujarati - ગુજરાતી",
      hi: "Hindi - हिंदी",
      kn: "Kannada - ಕನ್ನಡ",
      ml: "Malayalam - മലയാളം",
      mni: "Manipuri - মিতৈলোন",
      mr: "Marathi - मराठी",
      or: "Oriya - ଓଡ଼ିଆ",
      raj: "Rajasthani - राजस्थानी",
      ta: "Tamil - தமிழ்",
      te: "Telugu - తెలుగు",
      pa: "Punjabi - ਪੰਜਾਬੀ",
      en: "English - English",
    };

    this.getAudioOutput = this.getAudioOutput.bind(this);
  }

  getAudioOutput() {
    this.setState({ isFetching: true });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      controlConfig: {
        dataTracking: true,
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
            <div className="a4b-transliterate-container">
              <IndicTransliterate
                enabled={this.state.languageChoice !== "en"}
                renderComponent={(props) => (
                  <textarea className="a4b-transliterate-text" {...props} />
                )}
                value={this.state.transliteratedText}
                placeholder="Type your text here to convert...."
                onChangeText={(text) => {
                  this.setState({ transliteratedText: text });
                }}
                lang={this.state.languageChoice}
              />
            </div>
          </div>
          <div className="a4b-tts-convert">
            <button onClick={this.getAudioOutput} className="asr-button">
              Convert
            </button>
            {this.state.isFetching ? (
              <Skeleton sx={{ height: 80, width: 300, bgcolor: "#fbdad0" }} />
            ) : (
              <audio
                hidden={this.state.audioHidden}
                src={this.state.audioComponent}
                controls
              />
            )}
          </div>
          <Documentation documentation={ttsDocumentation} />
        </div>
      );
    } else if (_this.state.inferenceMode === "WebSocket") {
      return (
        <div classname="a4b-interface">
          {this.showProgress()}
          <div className="a4b-output">
            <div className="a4b-transliterate-container">
              <IndicTransliterate
                onKeyUp={(e) => {
                  _this.getStreamingOutput(e);
                }}
                renderComponent={(props) => (
                  <textarea className="a4b-transliterate-text" {...props} />
                )}
                value={_this.state.streamingText}
                placeholder="Type your text here to convert...."
                onChangeText={(text) => {
                  _this.setState({ streamingText: text });
                }}
                lang={_this.state.languageChoice}
              />
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
              width={50}
              height={50}
              src={require("../../media/ai4bharat.jpg")}
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
              }}
              value={this.state.languageChoice}
              onChange={(e) => {
                this.setState({ languageChoice: e.target.value });
                localStorage.setItem("ttsLanguageChoice", e.target.value);
              }}
              sx={{ borderRadius: 15 }}
              className="a4b-option-select"
            >
              {Object.entries(this.languages).map(([language, optionText]) => {
                return (
                  <MenuItem key={language} sx={{ margin: 1 }} value={language}>
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
              sx={{ borderRadius: 15 }}
              className="a4b-option-select"
            >
              {Object.entries(this.modes).map(([language, optionText]) => {
                return (
                  <MenuItem key={language} sx={{ margin: 1 }} value={language}>
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
              }}
              value={this.state.voiceGender}
              onChange={(e) => {
                this.setState({ voiceGender: e.target.value });
                localStorage.setItem("ttsVoiceGender", e.target.value);
              }}
              sx={{ borderRadius: 15 }}
              className="a4b-option-select"
            >
              <MenuItem sx={{ margin: 1 }} value={"male"}>
                Male
              </MenuItem>
              <MenuItem sx={{ margin: 1 }} value={"female"}>
                Female
              </MenuItem>
            </Select>
          </label>
        </div>
        {this.state.pipelineOutput && (
          <FeedbackModal
            pipelineInput={this.state.pipelineInput}
            pipelineOutput={this.state.pipelineOutput}
            taskType={"tts"}
          />
        )}
        {this.setInferenceInterface()}
      </div>
    );
  }
}
