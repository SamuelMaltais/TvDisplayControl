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
      response: "The special code should be known by the techs. If they forgot, ask them to look into summer 2022 inter Samuel Maltais's folders"
    };
  }

  submit(startDate, endDate, specialCode, picure) {
    console.log(startDate + " " + endDate + " " + specialCode);

    fetch("http://localhost:5000", {
      method: 'POST',
      body: JSON.stringify({
        title: "Dates",
        startDate: startDate,
        endDate: endDate,
        specialCode: specialCode
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })

      .then(response => {
        console.log(response.statusText);
      })
      .catch(error => {
        console.log(error);
      });


  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <p>{this.state.response}</p>
        <div className="form">
          <p>Start Date of the display (YYYY/MM/DD)</p>
          <input
            value={this.state.startDate}
            onChange={(e) => this.setState({ startDate: e.target.value })}
          />
          <p>End day of the display (YYYY/MM/DD)</p>
          <input
            value={this.state.endDate}
            onChange={(e) => this.setState({ endDate: e.target.value })}
          />
          <p>Special code to authorize upload</p>
          <input
            value={this.state.specialCode}
            onChange={(e) => this.setState({ specialCode: e.target.value })}
          />
          <button onClick={() => this.submit(this.state.startDate, this.state.endDate, this.state.specialCode, this.props.picure)}>submit</button>
        </div>
      </div>
    );
  }
}

export default createForm()(Form);