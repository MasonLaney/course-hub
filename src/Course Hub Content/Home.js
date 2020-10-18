import React, {Component} from "react";
import app from "../Authentication/base";
import data from "./test_deadlines.json"

class Home extends Component {

    constructor() {
        super();
        this.state = {
            schedule: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: []
        };
    }

    categorizeClasses() {
        this.state.schedule.forEach(item => {

            //if the class is on monday
            if(item.time.includes("Mo")) {
                var newStateArray = this.state.monday;
                newStateArray.push(item.class)
                this.setState({monday: newStateArray})
            }
            //if the class is on tuesday
            if(item.time.includes("Tu")) {
                var newStateArray = this.state.tuesday;
                newStateArray.push(item.class)
                this.setState({tuesday: newStateArray})
            }
            //if the class is on wednesday
            if(item.time.includes("We")) {
                var newStateArray = this.state.wednesday;
                newStateArray.push(item.class)
                this.setState({wednesday: newStateArray})
            }
            //if the class is on thursday
            if(item.time.includes("Th")) {
                var newStateArray = this.state.thursday;
                newStateArray.push(item.class)
                this.setState({thursday: newStateArray})
            }
            //if the class is on friday
            if(item.time.includes("Fr")) {
                var newStateArray = this.state.friday;
                newStateArray.push(item.class)
                this.setState({friday: newStateArray})            }
        })
    }

    componentDidMount() {
        this.setState()
        data.map(item => {
            var newStateArray = this.state.schedule;
            newStateArray.push({class: item.class, time: item.time, key: item.key})
            this.setState({schedule: newStateArray})
        })
        this.categorizeClasses()


    }

    render() {
        console.log(this.state.schedule)
        console.log(this.state.monday)
        console.log(this.state.tuesday)
        console.log(this.state.wednesday)
        console.log(this.state.thursday)
        console.log(this.state.friday)
        return (
            <div>
                <h1>Home Page</h1>
                <div>
                    {this.state.schedule.map(item => {
                        return(
                            <div>Class {item.class} and time {item.time}</div>
                    )})}
                </div>
                <DayBox
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
        )
    }
}

export default Home;
