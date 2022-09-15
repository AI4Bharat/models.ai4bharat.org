import React from "react";

import { FaMicrophone, FaRegCopy } from "react-icons/fa";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { streamingURL, asrAPIURL } from "../../config/config.js";
import {
  asrStreamingDocumentation,
  asrAPIDocumentation,
} from "./asrDocumentation.js";

import {
  StreamingClient,
  SocketStatus,
} from "@project-sunbird/open-speech-streaming-client";
import { Button } from "@mui/material";

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
      asrText: "Start Recording for ASR Inference....",
      asrAPIResult: "Upload Audio File or Record for ASR Inference....",
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

  renderSnippet(content) {
    if (content.snippet) {
      if (typeof content.snippet == "object") {
        return (
          <div className="a4b-snippet-container">
            <pre>{JSON.stringify(content.snippet, null, 2)}</pre>
            <div className="a4b-copy-container">
              <Button
                sx={{ height: 50, color: "#4a4a4a", borderColor: "#4a4a4a" }}
                size="large"
                variant="outlined"
                onClick={() => {
                  navigator.clipboard.writeText(content.snippet);
                }}
              >
                <FaRegCopy size={"20px"} />
              </Button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="a4b-snippet-container">
            <pre>{content.snippet}</pre>
            <div className="a4b-copy-container">
              <Button
                sx={{ height: 50, color: "#4a4a4a", borderColor: "#4a4a4a" }}
                size="large"
                variant="outlined"
                onClick={() => {
                  navigator.clipboard.writeText(content.snippet);
                }}
              >
                <FaRegCopy size={"20px"} />
              </Button>
            </div>
          </div>
        );
      }
    }
  }

  setInferenceInterface() {
    if (this.state.inferenceMode === "WebSocket") {
      return (
        <div className="asr-interface">
          <div className="a4b-output">
            {this.setStreamingMicAnimation()}
            <textarea
              placeholder="Start Recording for ASR Inference...."
              value={this.state.asrText}
              className="a4b-text"
            ></textarea>
          </div>

          <div className="documentation-container">
            <div className="a4b-box">
              <div className="a4b-box1">
                <h1 className="documentation-title">Documentation</h1>
              </div>
              <hr className="hr-split" />
              <div className="a4b-box1">
                <div className="text-15">
                  Request Method: <b>GET (WebSocket)</b>
                </div>
              </div>
              <br />
              <div className="a4b-box1">
                <div className="text-13">
                  WebSocket Streaming URL:
                  <a className="api-link" href={this.streamingURL}>
                    {this.streamingURL}
                  </a>
                </div>
              </div>
              <hr className="hr-split" />
              <div className="a4b-box1">
                <h1 className="text-15">Usage:</h1>
              </div>
              {Object.entries(asrStreamingDocumentation).map(
                ([key, content]) => {
                  return (
                    <div>
                      <div className="a4b-box1">
                        <h1 className="api-step-text">
                          {`${key}. ${content.step}`}
                        </h1>
                      </div>
                      {this.renderSnippet(content)}
                    </div>
                  );
                }
              )}
              <br />
            </div>
          </div>
        </div>
      );
    } else if (this.state.inferenceMode === "REST") {
      return (
        <div className="asr-interface">
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
          <div className="documentation-container">
            <div className="a4b-box">
              <div className="a4b-box1">
                <h1 className="documentation-title">Documentation</h1>
              </div>
              <hr className="hr-split" />
              <div className="a4b-box1">
                <div className="text-15">
                  Request Method: <b>POST</b>
                </div>
              </div>
              <br />
              <div className="a4b-box1">
                <div className="text-13">
                  API Endpoint:
                  <a className="api-link" href={this.asrAPIURL}>
                    {this.asrAPIURL}
                  </a>
                </div>
              </div>
              <hr className="hr-split" />
              <div className="a4b-box1">
                <h1 className="text-15">API Usage:</h1>
              </div>
              {Object.entries(asrAPIDocumentation).map(([key, content]) => {
                return (
                  <div>
                    <div className="a4b-box1">
                      <h1 className="api-step-text">
                        {`${key}. ${content.step}`}
                      </h1>
                    </div>
                    {this.renderSnippet(content)}
                  </div>
                );
              })}
              <br />
            </div>
          </div>
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
