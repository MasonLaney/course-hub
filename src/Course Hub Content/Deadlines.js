import React, {Component}  from "react"
import data from "./test_data_deadline_list.json"

class Deadlines extends Component {

    constructor() {
        super();
        this.state = {
            deadlines: []
        };
    }

    //fetch schedule data when mounting
    componentDidMount() {
        this.setState()
        data.map(item => {
            var newStateArray = this.state.deadlines;
            if(item.submitted.normalize() === "Not Started") {
                newStateArray.push({
                    submitted: item.submitted,
                    title: item.title,
                    due: (item.due === "") ? "No due date" : item.due,
                    link: item.link,
                    open: item.open,
                    key: item.key
                })
                this.setState({schedule: newStateArray})
            }
        })
    }

    render() {
        console.log(this.state.deadlines)
        return(
            <div>
                <h1>Deadlines:</h1>

                <div>
                    {
                        this.state.deadlines.map(item => {
                            return(
                                <p style={{padding: "10px", textAlign: "left", border: "1px solid blue"}}>
                                    <div style={{tabSize: "4"}}>
                                        <span style={{}}>{item.due} | {item.title}</span>
                                        <span style={{textAlign: "right"}}> <a href={item.link}>View Assignment</a></span>
                                    </div>
                                </p>)
                        })
                    }
                </div>
            </div>

        )
    }
}
export default Deadlines