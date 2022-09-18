import React from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FaMicrophone } from "react-icons/fa";
import Documentation from "../../components/A4BDocumentation/Documentation.js";
import { asrAPIURL, streamingURL } from "../../config/config.js";
import {
  asrAPIDocumentation,
  asrStreamingDocumentation,
} from "./asrDocumentation.js";
import { Button } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";

import {
  SocketStatus,
  StreamingClient,
} from "@project-sunbird/open-speech-streaming-client";

export default class ASR extends React.Component {
  constructor(props) {
    super(props);
    this.streamingURL = streamingURL;
    this.asrAPIURL = asrAPIURL;
    this.state = {
      inferenceMode: "WebSocket",
      isStreaming: true,
      streaming: new StreamingClient(),
      asrText: "",
      asrAPIResult: "",
      isRecording: true,
      audioChunks: [],
      audioFileContent: "",
      audioFileName: "No File Uploaded",
      languageChoice: "hi",
      samplingRateChoice: 48000,
      processorChoice: [],
      docExpanded: false,
    };
    this.languages = {
      hi: "Hindi",
      mr: "Marathi",
      "hi+en": "Hindi+English",
      "mr+en": "Marathi+English",
    };
    this.samplingRates = [48000, 16000, 8000];
    this.postProcessors = {
      numbers_only: "Numbers Only",
    };
    this.recorder = null;
    this.toggleStreaming = this.toggleStreaming.bind(this);
    this.onStreamOpen = this.onStreamOpen.bind(this);
    this.onStreamClosed = this.onStreamClosed.bind(this);
    this.setText = this.setText.bind(this);
    this.setInferenceMode = this.setInferenceMode.bind(this);
    this.getASROutput = this.getASROutput.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
  }

  getASROutput(asrInput) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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

    fetch(`${this.asrAPIURL + this.state.languageChoice}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        var apiResponse = JSON.parse(result);
        this.setState({ asrAPIResult: apiResponse["output"][0]["source"] });
      })
      .catch((error) => console.log("error", error));
  }

  setInferenceMode(mode) {
    this.setState({ inferenceMode: mode });
    this.setState({ isStreaming: true });
    this.setState({ isRecording: true });
    this.setState({
      asrText: "",
      asrAPIResult: "",
    });
  }

  onStreamOpen() {
    console.log("Stream Started");
    const _this = this;
    _this.setState({ asrText: "Detecting Audio...." });
    console.log(
      `Starting ASR with Language: ${_this.state.languageChoice} Sampling Rate: ${_this.state.samplingRateChoice} and Processors: ${_this.state.processorChoice} ...`
    );
    _this.state.streaming.connect(
      _this.streamingURL,
      _this.state.languageChoice,
      _this.state.samplingRateChoice,
      _this.state.processorChoice,
      function (action, id) {
        if (action === SocketStatus.CONNECTED) {
          console.log("Connected");
          console.log("Starting Stream....");
          _this.state.streaming.startStreaming(
            function (transcript) {
              _this.setText(transcript);
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

  setText(text) {
    this.setState({ asrText: text });
  }

  onStreamClosed() {
    console.log("Stream Closed");
    this.setState({ asrText: "Start Recording for ASR Inference...." });
    this.state.streaming.stopStreaming();
    this.state.streaming.disconnect();
  }

  toggleStreaming() {
    this.setState({ isStreaming: !this.state.isStreaming });
    this.state.isStreaming ? this.onStreamOpen() : this.onStreamClosed();
  }

  setStreamingMicAnimation() {
    if (this.state.isStreaming) {
      return (
        <button onClick={this.toggleStreaming} className="a4b-mic">
          <FaMicrophone className="a4b-mic-logo" />
        </button>
      );
    } else {
      return (
        <button onClick={this.toggleStreaming} className="a4b-mic-recording">
          <FaMicrophone className="a4b-mic-logo" />
        </button>
      );
    }
  }

  setInferenceInterface() {
    if (this.state.inferenceMode === "WebSocket") {
      return (
        <div className="a4b-interface">
          <div className="a4b-output">
            {this.setStreamingMicAnimation()}
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
          <div className="a4b-output">
            {this.renderRecordButton()}
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

  startRecording() {
    const _this = this;
    _this.setState({ isRecording: !_this.state.isRecording });
    _this.setState({ asrAPIResult: "Recording Audio...." });
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      _this.recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
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

  renderRecordButton() {
    if (this.state.isRecording) {
      return (
        <button onClick={this.startRecording} className="a4b-mic">
          <FaMicrophone className="a4b-mic-logo" />
        </button>
      );
    } else {
      return (
        <button onClick={this.stopRecording} className="a4b-mic-recording">
          <FaMicrophone className="a4b-mic-logo" />
        </button>
      );
    }
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
                return <MenuItem value={language}>{optionText}</MenuItem>;
              })}
            </Select>
          </label>
          <label className="a4b-option">
            Choose Interface Type :
            <Select
              value={this.state.inferenceMode}
              sx={{ borderRadius: 15 }}
              className="a4b-option-select"
              onChange={(e) => {
                this.setInferenceMode(e.target.value);
              }}
            >
              <MenuItem value="WebSocket">Streaming (WebSocket)</MenuItem>
              <MenuItem value="REST">REST</MenuItem>
            </Select>
          </label>
          <label className="a4b-option">
            Choose Post Processor :
            <Select
              multiple
              value={this.state.processorChoice}
              sx={{ borderRadius: 15 }}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                let choices =
                  typeof value === "string" ? value.split(",") : value;
                this.setState({ processorChoice: choices });
                console.log(choices);
              }}
              className="a4b-option-select"
            >
              {Object.entries(this.postProcessors).map(
                ([processor, optionText]) => {
                  return <MenuItem value={processor}>{optionText}</MenuItem>;
                }
              )}
            </Select>
          </label>
          <label className="a4b-option">
            Choose Sample Rate :
            <Select
              sx={{ borderRadius: 15 }}
              value={this.state.samplingRateChoice}
              onChange={(e) => {
                this.setState({ samplingRateChoice: e.target.value });
              }}
              className="a4b-option-select"
            >
              {this.samplingRates.map((value, index) => {
                return <MenuItem value={value}>{`${value} kHz`}</MenuItem>;
              })}
            </Select>
          </label>
        </div>
        {this.setInferenceInterface()}
      </div>
    );
  }
}
