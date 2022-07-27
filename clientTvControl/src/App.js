import React, { Component } from 'react'
import ImageUploader from "react-images-upload";
import Header from "./Components/Header.js"
import Form from "./Components/Forms.js"
import "./App.css";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });

    }
    render() {
        return (
            <div className="app">
                <Header />
                <Form picture={this.state.pictures} />
                <ImageUploader
                    withIcon={true}
                    buttonText="Choose images"
                    onChange={this.onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                />
                <img src={this.state.pictures[0]} alt="Your image" height={200} width={200} />
            </div>
        )
    }
}