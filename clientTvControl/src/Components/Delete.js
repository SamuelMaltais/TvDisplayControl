import React, { Component } from "react";
class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }
  state = {};
  getImageArray = () => {
    fetch("http://localhost:5000/display")
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        let elementstring = body.message;
        this.setState({ images: elementstring.trim().split(/\s+/) });
      })
      .catch((error) => {
        console.log("Error");
      });
  };
  render() {
    this.getImageArray();
    return (
      <div>
        <h1>View and delete current posts</h1>
      </div>
    );
  }
}

export default Delete;
