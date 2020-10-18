import React from "react";
import app from "../Authentication/base";

import deadlineData from "../Authentication/test_deadlines"

function Home() {

    const deadlines = deadlineData.map(deadline => {
	    return (
		    <p>{deadline}</p>
	    )
    })

    //componentDidMount() {

    //}

    return (
        <div>
            <h1>Home</h1>
            <p>{deadlines}</p>
            <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
    )
}

export default Home;
