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
      specialCode: ""
    };
  }


  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
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
      </div>
    );
  }
}

export default createForm()(Form);