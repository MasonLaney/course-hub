import React from "react";
import app from "../Authentication/base";

class Home extends React.Component {

    constructor() {
        super();
    }

    //componentDidMount() {

    //}

    render() {
        return (
            <div>
                <h1>Home</h1>
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
        )
    }
};

export default Home;
