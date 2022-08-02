import React, { Component } from "react";
export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "ok",
      increment: 0,
      result: [],
    };
    this.getImage();
  }

  getImage = () => {
    let result = [];
    let elementstring = "";
    fetch("http://localhost:5000/display")
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        elementstring = body.message;
        result = elementstring.trim().split(/\s+/);
        this.setState({ result: result });
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundImage =
          "url('http://localhost:5000/" + result[0] + "')";
        setInterval(triggerOnInterval(result), 7000);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  triggerOnInterval = () => {
    path = this.state.result[this.state.increment % this.state.result.length];
    document.body.style.backgroundImage =
      "url('http://localhost:5000/" + path + "')";
    this.setState({ increment: this.state.increment + 1 });
    console.log(path);
  };
  changeResultString = () => {};

  render() {
    return <div></div>;
  }
}
