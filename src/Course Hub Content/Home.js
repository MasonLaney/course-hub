import React, {Component} from "react";
import app from "../Authentication/base";
import data from "./test_deadlines.json"

class Home extends Component {

    render() {
        /*var schedule = data;
        this.schedule.map(item => {
            return(
                <div>Class {item.class} and time {item.time}</div>
            )
        })*/
        //console.log(data)

        return (
            <div>
                <h1>Home Page</h1>
                <div>
                    {data.map(item => {
                        return(
                            <div>Class {item.class} and time {item.time}</div>
                    )})}
                </div>

                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
        )
    }
}

export default Home;
