import React, {Component} from "react";
import app from "../Authentication/base";
import DayBox from "./DayBox";
import data from "./test_deadlines.json"

class Home extends Component {

    // set up state to hold the schedule, the classes for each day, and the deadlines
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

    // categorize the classes for each day to format weekly schedule
    categorizeClasses() {
        this.state.schedule.forEach(item => {
            var newStateArray;
            //if the class is on monday
            if(item.time.includes("Mo")) {
                newStateArray = this.state.monday;
                newStateArray.push(item.class)
                this.setState({monday: newStateArray})
            }
            //if the class is on tuesday
            if(item.time.includes("Tu")) {
                newStateArray = this.state.tuesday;
                newStateArray.push(item.class)
                this.setState({tuesday: newStateArray})
            }
            //if the class is on wednesday
            if(item.time.includes("We")) {
                newStateArray = this.state.wednesday;
                newStateArray.push(item.class)
                this.setState({wednesday: newStateArray})
            }
            //if the class is on thursday
            if(item.time.includes("Th")) {
                newStateArray = this.state.thursday;
                newStateArray.push(item.class)
                this.setState({thursday: newStateArray})
            }
            //if the class is on friday
            if(item.time.includes("Fr")) {
                newStateArray = this.state.friday;
                newStateArray.push(item.class)
                this.setState({friday: newStateArray})            }
        })
    }

    //fetch schedule data when
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
            <div className="mainPageContent">
                <h1>Home Page</h1>
                <div>
                    {this.state.schedule.map(item => {
                        return(
                            <div>Class {item.class} and time {item.time}</div>
                    )})}
                </div>
                <DayBox day="Monday" classes={this.state.monday}/>
                <DayBox day="Tuesday" classes={this.state.tuesday}/>
                <DayBox day="Wednesday" classes={this.state.wednesday}/>
                <DayBox day="Thursday" classes={this.state.thursday}/>
                <DayBox day="Friday" classes={this.state.friday}/>

                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
        )
    }
}

export default Home;
