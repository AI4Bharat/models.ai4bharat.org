import React from "react";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { HiOutlineMenu } from "react-icons/hi";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { FaHome, FaRegFileAudio, FaRegKeyboard } from "react-icons/fa";

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
      xlit: ["Indic Transliteration (XLit)", <FaRegKeyboard />],
    };
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Button
          onClick={(event) => {
            this.setState({ anchorEl: event.currentTarget, open: true });
          }}
        >
          <HiOutlineMenu size={"2em"} className="nav-menu-logo" />
        </Button>
        <Menu
          disableScrollLock={true}
          sx={{ position: "absolute", zIndex: 10 }}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={() => {
            this.setState({ anchorEl: null, open: false });
          }}
        >
          {Object.entries(this.pages).map(([page, pageMenuContent]) => {
            return (
              <MenuItem
                component={Link}
                to={`/${page}`}
                onClick={() => {
                  this.setState({ anchorEl: null, open: false });
                }}
              >
                <ListItemText
                  sx={{
                    width: "100%",
                  }}
                >
                  <ListItemIcon>{pageMenuContent[1]}</ListItemIcon>
                  {pageMenuContent[0]}
                </ListItemText>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}
