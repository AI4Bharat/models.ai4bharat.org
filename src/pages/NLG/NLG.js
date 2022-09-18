import React from "react";

export default class NLG extends React.Component {
  constructor(props) {
    super(props);
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
            Indic Natural Language Generation (NLG)
          </h1>
          <p className="subtitle">
            Generate text in real-time across various Indian Languages.
          </p>
        </section>
        <iframe
          src="https://hf.space/embed/ai4bharat/IndicNLG/+?__theme=light"
          data-src="https://hf.space/embed/ai4bharat/IndicNLG/+"
          data-sdk="gradio"
          title="Gradio app"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
          scrolling="yes"
          id="nlg-iframe"
          frameBorder={"0"}
          style={{ overflow: "hidden", height: "1000px", width: "90%" }}
        ></iframe>
      </div>
    );
  }
}
