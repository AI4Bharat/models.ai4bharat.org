import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

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
            Welcome to <span className="orange-color">AI4Bharat</span> Demos.
          </h1>
          <p className="subtitle">
            Try real-time Language Models and Tools in one place!
          </p>
        </section>
      </div>
    );
  }
}
