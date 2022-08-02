import { Component } from "react";

export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "ok",
      increment: 0,
      result: [],
      hasInterval: false,
    };
  }

  getImage = () => {
    let elementstring = "";
    fetch("http://localhost:5000/display")
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        elementstring = body.message;
        let array = elementstring.trim().split(/\s+/);
        this.setState({ result: array });
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        console.log(array);
        if (!this.state.hasInterval) {
          this.triggerOnInterval();
          this.timerID = setInterval(() => this.triggerOnInterval(), 7000);
          this.setState({ hasInterval: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getImage();
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  triggerOnInterval = () => {
    let path =
      this.state.result[this.state.increment % this.state.result.length];
    document.body.style.backgroundImage =
      "url('http://localhost:5000/" + path + "')";
    this.setState({ increment: this.state.increment + 1 });
    console.log(this.state.result);
    if (this.state.increment % 60 == 0) {
      this.getImage();
    }
  };
  changeResultString = () => {};

  render() {
    return <div></div>;
  }
}
