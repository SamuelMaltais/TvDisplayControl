import { Component } from "react";
import "./Display.css"

const apiKey = "fe62ba5eca5e4d4105b10167c45b5ae2"
export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "ok",
      increment: 0,
      result: [],
      hasInterval: false,
      url: "",
      time: " ",
      temp: "",
      description: "",
      wind: ""
    };
  }

  getImage = () => {
    let elementstring = "";
    fetch("https://server-for-mcgill-display.herokuapp.com/display")
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        elementstring = body.message;
        let array = elementstring.trim().split(/\s+/);
        this.setState({ result: array });
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundSize = "cover";
        if (!this.state.hasInterval) {
          this.triggerOnInterval();
          this.timerID = setInterval(() => this.triggerOnInterval(), 15000);
          this.setState({ hasInterval: true })
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return " ";
  }
  componentWillMount() {
    this.getImage()
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  addZeros = (num) => {
    return num < 10 ? "0" + num : num;
  }
  getWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Montreal&units=metric&apikey=" + apiKey)
      .then((response) => {
        return response.json()
      })
      .then((body) => {
        this.setState({ temp: body.main.temp })
        this.setState({ description: body.weather[0].description })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  triggerOnInterval = () => {
    let path =
      this.state.result[this.state.increment % this.state.result.length];
    this.setState({ url: "https://server-for-mcgill-display.herokuapp.com/" + path })
    this.setState({ increment: this.state.increment + 1 });
    console.log(this.state.result);
    if (this.state.increment % 20 == 0) {
      this.getImage();
    }
    let date = new Date();
    this.setState({ time: date.getHours() + "h" + this.addZeros(date.getMinutes()) })
    this.getWeather();
  };

  render() {
    return <div className="display">
      <img className="display-main-image" src={this.state.url}></img>
      <div className="column">
        <h1>Infos</h1>
        <p className="thing">⌚Time⌚</p>
        <p className="time">{this.state.time}</p>
        <p className="thing"> 🌡️️Temperature🌡️ outside</p>
        <p className="temperature-text">{this.state.temp.toString()[0] + this.state.temp.toString()[1]}°C</p>
        <p className="thing"> Weather</p>
        <p className="thing">{this.state.description}</p>


      </div>
    </div>;
  }
}
