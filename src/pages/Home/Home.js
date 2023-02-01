import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { models } from "./modelsAvailable";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { FaKeyboard, FaLaptopCode, FaLanguage } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { BsFillMicFill } from "react-icons/bs";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { BiWorld } from "react-icons/bi";
import { BsSoundwave, BsFileTextFill, BsTagFill } from "react-icons/bs";
import { SiAudiomack } from "react-icons/si";

const theme = createTheme({
  palette: {
    action: {
      disabled: "#ffffff",
    },
  },
});

const modelIcons = {
  xlit: <FaKeyboard size={35} className="a4b-home-card-logo" />,
  asr: <BsFillMicFill size={35} className="a4b-home-card-logo" />,
  nmt: <BiWorld size={35} className="a4b-home-card-logo" />,
  nlg: <BsFileTextFill size={35} className="a4b-home-card-logo" />,
  tts: <SiAudiomack size={35} className="a4b-home-card-logo" />,
  bert: <FaLanguage size={35} className="a4b-home-card-logo" />,
  ner: <BsTagFill size={35} className="a4b-home-card-logo" />,
  sts: <BsSoundwave size={35} className="a4b-home-card-logo" />,
};

export default class Home extends React.Component {
  renderDemoButton(path) {
    if (path !== "") {
      return (
        <Button
          component={Link}
          to={`/${path}`}
          sx={{
            color: "white",
            height: 50,
            width: 100,
            display: "flex",
            justifyContent: "right",
          }}
          size="small"
        >
          <div style={{ height: "100%", width: "auto" }}>
            <p style={{ textDecorationStyle: "solid" }}>Try it!</p>
          </div>
          <div
            style={{
              height: "100%",
              width: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaLaptopCode style={{ margin: 5 }} size={20} />
          </div>
        </Button>
      );
    }
  }
  renderModelHomeLink(link) {
    if (link !== "") {
      return (
        <Button
          href={link}
          target="_blank"
          sx={{
            color: "white",
            height: 50,
            width: 200,
          }}
          size="small"
        >
          <div style={{ height: "100%", width: "70%" }}>
            <p style={{ textDecorationStyle: "solid" }}>Know More</p>
          </div>
          <div
            style={{
              height: "100%",
              width: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HiArrowRight size={20} />
          </div>
        </Button>
      );
    }
  }

  render() {
    return (
      <div className="a4b-component-container">
        <section className="title-section">
          <h1 className="title">
            <img
              className="a4b-logo"
              alt="a4blogo"
              width={50}
              height={50}
              src={require("../../media/ai4bharat.jpg")}
            ></img>
            Welcome to <span className="orange-color">AI4Bharat</span> Models.
          </h1>
          <p className="subtitle">
            Try real-time Language Models and Tools in one place.
          </p>
        </section>
        <hr className="hr-split" />
        <div className="a4b-home-container">
          {Object.entries(models).map(([path, cardContent]) => {
            return (
              <Card
                sx={{ position: "relative", borderRadius: 5, boxShadow: 10 }}
                className="a4b-home-card"
                key={path}
              >
                <Box className="a4b-home-card-logo-container">
                  {modelIcons[path]}
                </Box>
                <CardContent className="a4b-home-card-content">
                  <Typography
                    sx={{ marginLeft: 1, overflow: "auto" }}
                    variant="h5"
                  >
                    {cardContent.title}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: 1,
                      marginTop: 1,
                      overflow: "auto",
                      height: 165,
                      textAlign: "justify",
                      paddingRight: 1,
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {cardContent.about}
                  </Typography>
                </CardContent>
                <CardActions className="a4b-home-card-actions">
                  <ThemeProvider theme={theme}>
                    {this.renderModelHomeLink(cardContent.link)}
                    {this.renderDemoButton(cardContent.path)}
                  </ThemeProvider>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
