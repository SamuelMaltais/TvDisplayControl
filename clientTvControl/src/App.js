import React, { Component } from 'react'
import ImageUploader from "react-images-upload";
import Header from "./Components/Header.js"
import Form from "./Components/Forms.js"
import "./App.css";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            pictureResponse: ""
        };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
            pictureResponse: "Picture selected: " + pictureFiles
        })
    }
    render() {
        return (
            <div className="app">
                <Header />
                <Form picture={this.state.pictures[0]} />
                <p>{this.state.pictureResponse}</p>
                <ImageUploader
                    name="picture"
                    withIcon={true}
                    buttonText="Choose image"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png"]}
                    maxFileSize={5242880}
                />

            </div>
        )
    }
}