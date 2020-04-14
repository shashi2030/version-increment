import React, { Component } from "react";
const version = require('../../JSON/version.json');

class Home extends Component {
    render() {
        return (
            <div className="wrapper">
               Version {version.version.major}.{version.version.minor}.{version.version.patch}
            </div>
        )
    }
}

export default Home;