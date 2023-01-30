import React from "react";

import {
  ASR_STREAMING_URLS,
  ASR_REST_URLS,
  ASR_LANGUAGE_CONFIGS,
  LANGUAGE_KEY_TEXT,
} from "../../config/config.js";
import {
  asrAPIDocumentation,
  asrStreamingDocumentation,
} from "./asrDocumentation.js";

import {
  SocketStatus,
  StreamingClient,
} from "@project-sunbird/open-speech-streaming-client";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FaMicrophone, FaRegCopy } from "react-icons/fa";
import Documentation from "../../components/A4BDocumentation/Documentation.js";
import LinearProgress from "@mui/material/LinearProgress";

import { Button } from "@mui/material";

export default class ASR extends React.Component {
  constructor(props) {
    super(props);

    this.ASR_LANGUAGE_CONFIGS = ASR_LANGUAGE_CONFIGS;
    this.samplingRates = [48000, 16000, 8000];

    this.state = {
      inferenceMode: "WebSocket",
      languageChoice: localStorage.getItem("asrLanguageChoice"),
      samplingRateChoice: localStorage.getItem("samplingRateChoice"),
      processorChoice: JSON.parse(localStorage.getItem("processorChoice"))[
        "processors"
      ],
      asrText: "",
      asrAPIResult: "",
      streaming: new StreamingClient(),
      isStreaming: false,
      audioFileName: "No File Uploaded",
      isFetching: false,
      isRecording: false,
      audioChunks: [],
    };

    this.openStream = this.openStream.bind(this);
    this.closeStream = this.closeStream.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.setInferenceMode = this.setInferenceMode.bind(this);
    this.getASROutput = this.getASROutput.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }

  startRecording() {
    const _this = this;
    _this.setState({ isRecording: !_this.state.isRecording });
    _this.setState({ asrAPIResult: "Recording Audio...." });
    navigator.mediaDevices
      .getUserMedia({
        audio: { channelCount: 1, sampleRate: _this.state.samplingRateChoice },
      })
      .then((stream) => {
        _this.recorder = new MediaRecorder(stream);
        _this.recorder.ondataavailable = (e) => {
          _this.state.audioChunks.push(e.data);
        };
        _this.recorder.onstop = (e) => {
          console.log("Recording Stopped");
        };
        _this.recorder.start(0.5);
      });
  }

  stopRecording() {
    const _this = this;
    _this.setState({ isRecording: !_this.state.isRecording });
    _this.recorder.stop();
    let blob = new Blob(_this.state.audioChunks, { type: "audio/wav" });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      var base64Data = reader.result.split(",")[1];
      this.getASROutput(base64Data);
      _this.setState({ audioChunks: [] });
    };
  }

  getASROutput(asrInput) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    this.setState({ isFetching: true });

    var payload = JSON.stringify({
      config: {
        language: {
          sourceLanguage: this.state.languageChoice,
        },
        transcriptionFormat: {
          value: "transcript",
        },
        audioFormat: "wav",
        samplingRate: this.state.samplingRateChoice,
        postProcessors:
          this.state.processorChoice.length === 0
            ? null
            : this.state.processorChoice,
      },
      audio: [
        {
          audioContent: asrInput,
        },
      ],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    };

    console.log(payload);
    const ASR_REST_URL = `${
      ASR_REST_URLS[this.state.languageChoice]
    }/asr/v1/recognize/${this.state.languageChoice}`;
    fetch(ASR_REST_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        var apiResponse = JSON.parse(result);
        this.setState({
          asrAPIResult: apiResponse["output"][0]["source"],
          isFetching: false,
        });
      })
      .catch((error) => console.log("error", error));
  }

  setInferenceMode(mode) {
    this.setState({ inferenceMode: mode });
    this.setState({ isStreaming: false });
    this.setState({
      asrText: "",
      asrAPIResult: "",
    });
  }

  renderStreamButton() {
    const _this = this;
    if (_this.state.isStreaming) {
      return (
        <button onClick={_this.closeStream} className="a4b-mic-recording">
          <FaMicrophone className="a4b-mic-logo" />
        </button>
      );
    } else {
      return (
        <button onClick={_this.openStream} className="a4b-mic">
          <FaMicrophone className="a4b-mic-logo" />
        </button>
      );
    }
  }

  renderRecordButton() {
    if (this.state.isRecording) {
      return (
        <button onClick={this.stopRecording} className="a4b-mic-recording">
          <FaMicrophone className="a4b-mic-logo" />
        </button>
      );
    } else {
      return (
        <button onClick={this.startRecording} className="a4b-mic">
          <FaMicrophone className="a4b-mic-logo" />
        </button>
      );
    }
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

  openStream() {
    const _this = this;
    _this.setState({ isStreaming: true, asrText: "Detecting Audio...." });
    console.log(
      `Starting ASR with Language: ${_this.state.languageChoice} Sampling Rate: ${_this.state.samplingRateChoice} and Processors: ${_this.state.processorChoice} ...`
    );

    _this.state.streaming.connect(
      ASR_STREAMING_URLS[_this.state.languageChoice],
      _this.state.languageChoice,
      _this.state.samplingRateChoice,
      _this.state.processorChoice,
      function (action, id) {
        if (action === SocketStatus.CONNECTED) {
          console.log("Connected");
          console.log("Starting Stream....");
          _this.state.streaming.startStreaming(
            function (transcript) {
              _this.setState({ asrText: transcript });
            },
            (e) => {
              console.log("Encountered an error: ", e);
            }
          );
        } else if (action === SocketStatus.TERMINATED) {
          console.log("Terminated");
        } else {
          console.log("Action: ", action, id);
        }
      }
    );
  }

  closeStream() {
    const _this = this;
    if (_this.state.asrText === "Detecting Audio....") {
      _this.setState({ asrText: "" });
    }
    _this.state.streaming.stopStreaming();
    _this.state.streaming.disconnect();
    _this.setState({ isStreaming: false });
    console.log("Closed");
  }

  handleModeChange() {
    const _this = this;
    if (_this.state.isStreaming) {
      _this.state.streaming.stopStreaming();
      _this.state.streaming.disconnect();
      console.log("Mode Change, Closing Stream");
    }
  }

  setInferenceInterface() {
    const _this = this;
    if (_this.state.inferenceMode === "WebSocket") {
      return (
        <div className="a4b-interface">
          <div className="a4b-output">
            <div className="a4b-asr-buttons">
              {_this.renderStreamButton()}
              <Button
                sx={{
                  width: 10,
                  height: 50,
                  color: "#4a4a4a",
                  borderColor: "#4a4a4a",
                  marginTop: 1,
                }}
                size="large"
                variant="outlined"
                onClick={() => {
                  if (this.state.asrText) {
                    navigator.clipboard.writeText(this.state.asrText);
                  }
                }}
              >
                <FaRegCopy size={"20px"} />
              </Button>
            </div>
            <textarea
              placeholder="Start Recording for ASR Inference...."
              value={this.state.asrText}
              className="a4b-text"
            ></textarea>
          </div>
          <Documentation documentation={asrStreamingDocumentation} />
        </div>
      );
    } else if (this.state.inferenceMode === "REST") {
      return (
        <div className="a4b-interface">
          {this.showProgress()}
          <div className="a4b-output">
            <div className="a4b-asr-buttons">
              {_this.renderRecordButton()}
              <Button
                sx={{
                  width: 10,
                  height: 50,
                  color: "#4a4a4a",
                  borderColor: "#4a4a4a",
                  marginTop: 1,
                }}
                size="large"
                variant="outlined"
                onClick={() => {
                  if (this.state.asrAPIResult) {
                    navigator.clipboard.writeText(this.state.asrAPIResult);
                  }
                }}
              >
                <FaRegCopy size={"20px"} />
              </Button>
            </div>
            <textarea
              placeholder="Upload Audio File or Record for ASR Inference...."
              value={this.state.asrAPIResult}
              className="a4b-text"
            />
          </div>
          <div>
            <div className="a4b-file-upload">
              <label className="asr-button">
                Choose File
                <input
                  className="audio-file-upload"
                  type="file"
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                  onChangeCapture={(event) => {
                    const selectedAudioFile = event.target["files"][0];
                    this.setState({ audioFileName: selectedAudioFile.name });
                    const selectedAudioReader = new FileReader();
                    selectedAudioReader.readAsDataURL(selectedAudioFile);
                    selectedAudioReader.onloadend = () => {
                      const asrInput = selectedAudioReader.result.split(",")[1];
                      this.getASROutput(asrInput);
                    };
                  }}
                />
              </label>
              <span className="a4b-file-upload-name">
                {this.state.audioFileName}
              </span>
            </div>
          </div>
          <Documentation documentation={asrAPIDocumentation} />
        </div>
      );
    }
  }

  renderLanguageChoice() {
    let choices = [];
    if (this.state.inferenceMode === "WebSocket") {
      this.ASR_LANGUAGE_CONFIGS.streaming.map((language) => {
        choices.push(
          <MenuItem value={language}>{LANGUAGE_KEY_TEXT[language]}</MenuItem>
        );
        return true;
      });
    }
    if (this.state.inferenceMode === "REST") {
      this.ASR_LANGUAGE_CONFIGS.rest.map((language) => {
        choices.push(
          <MenuItem value={language}>{LANGUAGE_KEY_TEXT[language]}</MenuItem>
        );
        return true;
      });
    }
    return choices;
  }

  renderProcessorChoice() {
    let choices = [];
    if (this.state.languageChoice in ASR_LANGUAGE_CONFIGS.processors) {
      Object.entries(
        ASR_LANGUAGE_CONFIGS.processors[this.state.languageChoice]
      ).map(([processor, processorAttributes]) => {
        if (processorAttributes[0]) {
          choices.push(
            <MenuItem value={processor}>{processorAttributes[1]}</MenuItem>
          );
        }
        return true;
      });
    }
    return choices;
  }

  render() {
    return (
      <div>
        <section className="title-section">
          <h1 className="title">
            <img
              alt="a4blogo"
              className="a4b-logo"
              width={50}
              height={50}
              src={require("../../media/ai4bharat.jpg")}
            ></img>
            <span className="orange-color">AI4Bharat </span>
            Speech-to-Text using {this.state.inferenceMode}
          </h1>
          <p className="subtitle">
            Run speech models in <strong>real-time</strong> for Indian
            Languages!
          </p>
        </section>
        <hr className="hr-split" />
        <div className="common-options">
          <label className="a4b-option">
            Interface Type :
            <Select
              disabled={this.state.isStreaming || this.state.isRecording}
              MenuProps={{
                disableScrollLock: true,
              }}
              value={this.state.inferenceMode}
              sx={{ borderRadius: 15 }}
              className="a4b-option-select"
              onChange={(e) => {
                this.setInferenceMode(e.target.value);
                this.handleModeChange();
              }}
            >
              <MenuItem value="WebSocket">Streaming (WebSocket)</MenuItem>
              <MenuItem value="REST">REST (API)</MenuItem>
            </Select>
          </label>
          <label className="a4b-option">
            Language :
            <Select
              disabled={this.state.isStreaming || this.state.isRecording}
              MenuProps={{
                disableScrollLock: true,
              }}
              value={this.state.languageChoice}
              sx={{ borderRadius: 15 }}
              onChange={(e) => {
                this.setState({ languageChoice: e.target.value, asrText: "" });
                localStorage.setItem("asrLanguageChoice", e.target.value);
              }}
              className="a4b-option-select"
            >
              {this.renderLanguageChoice()}
            </Select>
          </label>
          <label className="a4b-option">
            Post Processor :
            <Select
              disabled={this.state.isStreaming || this.state.isRecording}
              multiple
              MenuProps={{
                disableScrollLock: true,
              }}
              value={this.state.processorChoice}
              sx={{ borderRadius: 15 }}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                let choices =
                  typeof value === "string" ? value.split(",") : value;
                localStorage.setItem(
                  "processorChoice",
                  JSON.stringify({ processors: choices })
                );
                this.setState({ processorChoice: choices, asrText: "" });
                console.log(choices);
              }}
              className="a4b-option-select"
            >
              {this.renderProcessorChoice()}
            </Select>
          </label>
          <label className="a4b-option">
            Sample Rate :
            <Select
              disabled={this.state.isStreaming || this.state.isRecording}
              MenuProps={{
                disableScrollLock: true,
              }}
              sx={{ borderRadius: 15 }}
              value={this.state.samplingRateChoice}
              onChange={(e) => {
                localStorage.setItem("samplingRateChoice", e.target.value);
                this.setState({
                  samplingRateChoice: e.target.value,
                });
              }}
              className="a4b-option-select"
            >
              {this.samplingRates.map((value, index) => {
                return <MenuItem value={value}>{`${value} Hz`}</MenuItem>;
              })}
            </Select>
          </label>
        </div>
        {this.setInferenceInterface()}
      </div>
    );
  }
}
