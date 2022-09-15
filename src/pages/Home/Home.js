import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { models } from "./modelsAvailable";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <section className="title-section">
          <h1 className="title">
            <img
              alt="a4blogo"
              width={100}
              height={100}
              src={require("../../media/ai4bharat.jpg")}
            ></img>
            Welcome to <span className="orange-color">AI4Bharat</span> Models.
          </h1>
          <p className="subtitle">
            Try real-time Language Models and Tools in one place!
          </p>
        </section>
        <hr className="hr-split" />
        <div className="a4b-home-container">
          {Object.entries(models).map(([path, cardContent]) => {
            return (
              <Card
                sx={{ height: 275, width: "500px", margin: 5, display: "flex" }}
              >
                <CardActions
                  sx={{
                    height: "auto",
                    width: "auto",
                    backgroundColor: "#eb7752",
                    position: "relative",
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    component={Link}
                    to={`/${path}`}
                    sx={{
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      justifyItems: "center",
                      height: "50%",
                    }}
                    size="small"
                  >
                    <MdOutlineSettingsApplications
                      style={{ margin: "3px" }}
                      size={"20px"}
                    />
                    Demo
                  </Button>
                  <Button
                    href={cardContent.link}
                    sx={{
                      color: "#ffffff",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      justifyItems: "center",
                      height: "50%",
                    }}
                    size="small"
                  >
                    <FaHome style={{ margin: "5px" }} size={"20px"} />
                    Home
                  </Button>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {cardContent.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cardContent.about}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
