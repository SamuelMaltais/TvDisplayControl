import React, { Component } from 'react'
export default class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ""
        };
    }
    getImage = () => {
        console.log("yes");
        return "yes"
    }
    render() {
        return (
            <div style={{ backgroundImage: this.state.image, backgroundSize: "100%" }}>
                {this.getImage}
            </div>
        )
    }
}
