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
      photos: []
    };
  }

  submit(startDate, endDate, specialCode, picture) {
    let allowed = true;
    if (startDate[4] != "/" || endDate[4] != "/" || startDate[7] != "/" || endDate[7] != "/") {
      allowed = false;
    }
    const fd = new FormData();
    fd.append('picture', picture);
    fd.append('startDate', startDate);
    fd.append('endDate', startDate);
    fd.append('specialCode', startDate);
    console.log(picture);
    if (allowed == true) {
      fetch("http://localhost:5000/upload", {
        method: 'POST',
        body: fd
      })

        .then(response => {
          this.setState({ response: "Upload succesfull" })
        })
        .catch(error => {
          this.setState({ response: "Error uploading" })
        });
    }
    else {
      this.setState({ response: "Wrong date format" })
    }
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <p>{this.state.response}</p>
        <div className="form">
          <p>Start date of the display (YYYY/MM/DD)</p>
          <input
            value={this.state.startDate}
            onChange={(e) => this.setState({ startDate: e.target.value })}
          />
          <p>End date of the display (YYYY/MM/DD)</p>
          <input
            value={this.state.endDate}
            onChange={(e) => this.setState({ endDate: e.target.value })}
          />
          <p>Special code to authorize upload</p>
          <input
            value={this.state.specialCode}
            onChange={(e) => this.setState({ specialCode: e.target.value })}
          />
          <button onClick={() => this.submit(this.state.startDate, this.state.endDate, this.state.specialCode, this.props.picture)}>submit</button>
        </div>
      </div>
    );
  }
}

export default createForm()(Form);