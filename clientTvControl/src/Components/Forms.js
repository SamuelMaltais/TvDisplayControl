import { createForm, formShape } from 'rc-form';
import React from 'react'
import "./Forms.css"
class Form extends React.Component {
  static propTypes = {
    form: formShape,
  };
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      specialCode: "",
      response: "The special code should be known by the techs. If they forgot, ask them to look into summer 2022 intern Samuel Maltais's folders",
      photos: [],
      time: ""
    };
  }

  submit(startDate, endDate, specialCode, picture, time) {
    let allowed = true;
    if (startDate[4] != "_" || endDate[4] != "_" || startDate[7] != "_" || endDate[7] != "_") {
      allowed = false;
      this.setState({ response: "Wrong date format" });
    }
    if (time[2] != "_") {
      allowed = false;
      this.setState({ response: "Wrong time format, put 23_59 if you don't care about it" })
    }
    console.log(picture);

    const fd = new FormData();
    fd.append('picture', picture);
    fd.append('startDate', startDate);
    fd.append('endDate', endDate);
    fd.append('specialCode', specialCode);
    fd.append('time', time);

    console.log(picture);
    if (allowed == true) {
      fetch("http://localhost:5000/upload", {
        method: 'POST',
        body: fd
      })
        .then(response => {
          return response.json()
        })
        .then(body => {
          this.setState({ response: body.message })
        })
        .catch(error => {
          this.setState({ response: "Error uploading" })
        });
    }
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <p>{this.state.response}</p>
        <div className="form">
          <p>Start date of the display (YYYY_MM_DD)</p>
          <input
            value={this.state.startDate}
            onChange={(e) => this.setState({ startDate: e.target.value })}
          />
          <p>End date of the display (YYYY_MM_DD)</p>
          <input
            value={this.state.endDate}
            onChange={(e) => this.setState({ endDate: e.target.value })}
          />
          <p>Special code to authorize upload</p>
          <input
            value={this.state.specialCode}
            onChange={(e) => this.setState({ specialCode: e.target.value })}
          />
          <p>End time of the display (Hour_Min, like 16_45)</p>
          <input
            value={this.state.time}
            onChange={(e) => this.setState({ time: e.target.value })}
          />
          <button className="submit-button" onClick={() => this.submit(this.state.startDate, this.state.endDate, this.state.specialCode, this.props.picture, this.state.time)}>submit</button>
        </div>
      </div>
    );
  }
}

export default createForm()(Form);