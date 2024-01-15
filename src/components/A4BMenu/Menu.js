import React from "react";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { HiOutlineMenu } from "react-icons/hi";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FaHome, FaRegFileAudio, FaRegKeyboard } from "react-icons/fa";
import { BsFileTextFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { SiAudiomack } from "react-icons/si";
import Drawer from "@mui/material/Drawer";

import { BsTagFill, BsSoundwave } from "react-icons/bs";

export default class A4BMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
    this.pages = {
      "": ["Home", <FaHome />],
      asr: ["Indic Speech-to-Text (ASR)", <FaRegFileAudio />],
      "asr/whisper": ["Indic Speech-to-Text Whisper (ASR)", <FaRegFileAudio />],
      "asr/conformer": [
        "Indic Speech-to-Text Conformer (ASR)",
        <FaRegFileAudio />,
      ],
      xlit: ["Indic Transliteration (XLit)", <FaRegKeyboard />],
      nlg: ["Indic Natural Language Generation (NLG)", <BsFileTextFill />],
      nmt: ["Indic Natural Language Translation (NMT) v1", <BiWorld />],
      "nmt/v2": ["Indic Natural Language Translation (NMT) v2", <BiWorld />],
      tts: ["Indic Text-to-Speech (TTS)", <SiAudiomack />],
      ner: ["Indic Named Entity Recognition (NER)", <BsTagFill />],
      sts: ["Indic Speech2Speech (STS)", <BsSoundwave />],
    };
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.setState({ open: true });
          }}
          style={{
            color: "white",
            borderRadius: "5px",
            padding: "9px",
          }}
        >
          <HiOutlineMenu size={"2em"} className="nav-menu-logo" />
        </Button>
        <Drawer
          anchor="left"
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false });
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: "20px",
              background: "#222222",
            }}
          >
            {/* Closing Button at the Top */}
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <Button
                onClick={() => {
                  this.setState({ open: false });
                }}
                style={{
                  color: "#FF6422",
                  borderRadius: "5px",
                  padding: "10px",
                  border: "1px solid #FF6422", // Border added here
                }}
              >
                Close
              </Button>
            </div>

            <div>
              {Object.entries(this.pages).map(([page, pageMenuContent]) => (
                <MenuItem
                  component={Link}
                  to={`/${page}`}
                  onClick={() => {
                    this.setState({ open: false });
                  }}
                  key={page}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ddd",
                    color: "white",
                  }}
                >
                  <ListItemIcon style={{ color: "#FF6422" }}>
                    {pageMenuContent[1]}
                  </ListItemIcon>
                  <ListItemText>{pageMenuContent[0]}</ListItemText>
                </MenuItem>
              ))}
            </div>

            {/* Additional Text as a Paragraph */}
            <div
              style={{
                marginTop: "auto",
                textAlign: "left",
                borderTop: "1px solid #ddd",
                paddingTop: "10px",
              }}
            >
              <h2 style={{ margin: "0", color: "#FF6422" }}>AI4Bharat</h2>
              <p style={{ margin: "5px 0", color: "white" }}>
                The focus of AI4Bharat, an initiative of IIT Madras, is on
              </p>
              <p style={{ margin: "5px 0", color: "white" }}>
                building open-source language AI for Indian languages,
              </p>
              <p style={{ margin: "5px 0", color: "white" }}>
                including datasets, models, and applications.
              </p>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}
