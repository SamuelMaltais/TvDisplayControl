import React, { Component } from 'react'
export default class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "ok"
        };
        this.getImage();
    }
    getImage = () => {
        let result = []
        let elementstring = "";
        fetch("http://localhost:5000/display")
            .then(response => {
                return response.json()
            })
            .then(body => {
                elementstring = body.message
                result = elementstring.trim().split(/\s+/);
                const values = Object.values(result)
                result.forEach(path => {
                    document.body.style.backgroundRepeat = "no-repeat"
                    document.body.style.backgroundSize = "cover"
                    document.body.style.backgroundImage = "url('http://localhost:5000/" + path + "')"
                    setTimeout(function () {
                        //changeBackground(path);
                    }, 8000);
                });
            })
            .catch(error => {
                console.log("error")
            });

    }
    changeBackground(path) {
        document.body.style.backgroundImage = "url('http://localhost:5000/" + path + "')"
    }
    render() {
        return (
            <div>
            </div>
        )
    }
}
