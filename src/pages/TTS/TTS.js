import { IndicTransliterate } from "@ai4bharat/indic-transliterate";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { FaPlay } from "react-icons/fa";

export default class TTS extends React.Component {
  constructor(props) {
    super(props);

    this.ttsURL = "https://tts-api.ai4bharat.org/";

    this.state = {
      languageChoice: "hi",
      voiceGender: "male",
      transliteratedText: null,
      audioComponent: null,
    };

    this.languages = {
      hi: "Hindi - हिंदी",
      mr: "Marathi - मराठी",
    };

    this.getAudioOutput = this.getAudioOutput.bind(this);
  }

  getAudioOutput() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
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
      .then((response) => response.text())
      .then((result) => {
        var apiResult = JSON.parse(result);
        var audioContent = apiResult["audio"][0]["audioContent"];
        var audio = "data:audio/wav;base64," + audioContent;
        this.setState({ audioComponent: audio });
      });
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
              }}
              sx={{ borderRadius: 15 }}
              className="a4b-option-select"
            >
              {Object.entries(this.languages).map(([language, optionText]) => {
                return (
                  <MenuItem sx={{ margin: 1 }} value={language}>
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
        <div className="a4b-interface">
          <div className="a4b-output">
            <div className="a4b-transliterate-container">
              <IndicTransliterate
                className="a4b-transliterate-text"
                renderComponent={(props) => <textarea {...props} />}
                value={this.state.transliteratedText}
                placeholder="Type your text here to transliterate...."
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
            <audio src={this.state.audioComponent} controls />
          </div>
        </div>
      </div>
    );
  }
}
