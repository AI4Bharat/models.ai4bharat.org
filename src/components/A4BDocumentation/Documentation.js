import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Button } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";

export default class Documentation extends React.Component {
  accordionStyle = {
    boxShadow: 5,
    width: "auto",
  };

  documentationTitle = { width: "70%", textAlign: "left" };

  constructor(props) {
    super(props);
    this.state = {
      docExpanded: false,
    };
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

  expandDoc() {
    this.setState({ docExpanded: !this.state.docExpanded });
  }

  renderMethodType(method) {
    if (method) {
      return (
        <div className="a4b-box1">
          <div className="text-15">
            Method : <b>{method}</b>
          </div>
        </div>
      );
    }
  }

  renderRequestURL(url) {
    if (url) {
      return (
        <div className="a4b-box1">
          <div className="text-13">
            Endpoint URL :
            <a className="api-link" href={url}>
              {url}
            </a>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="documentation-container">
        <Accordion expanded={this.state.docExpanded} sx={this.accordionStyle}>
          <AccordionSummary
            onClick={() => {
              this.setState({ docExpanded: !this.state.docExpanded });
            }}
          >
            <div className="a4b-box1">
              <div style={this.documentationTitle}>
                <h1 className="documentation-title">Documentation</h1>
              </div>
            </div>
            <hr className="hr-split" />
          </AccordionSummary>
          <AccordionDetails>
            {this.renderMethodType(this.props.documentation.method)}
            {this.renderRequestURL(this.props.documentation.url)}
            <hr className="hr-split" />
            <div className="a4b-box1">
              <h1 className="text-15">Usage:</h1>
            </div>
            {Object.entries(this.props.documentation.steps).map(
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
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}
