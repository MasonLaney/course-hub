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
        let todayDate = new Date();
        var date = parseInt(todayDate.getMonth() + 1);

        this.setState()
        data.map(item => {
            var newStateArray = this.state.deadlines;
            if(item.submitted.normalize() === "Not Started"
                && (parseInt(item.due.substring(5,7)) >= date)) {
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

    sortDeadlines() {
        var temp1 = [];
        var temp2 = [];
        var temp3 = [];

        //sort state by date
        for(let i = 0; i < this.state.length-1; i++) {
            for(let j = 0; j < this.state.length-i-1; j++) {
                if(this.state[j].due === "No due date") {
                    temp3 = this.state[j]
                    this.state.splice(j)
                    this.state = [this.state, temp3]
                }
                temp1 = parseInt(this.state[j].due.substring(0,9))
                temp2 = parseInt(this.state[j+1].due.substring(0,9))

                if(temp1>temp2) {
                    temp3 = this.state[j];
                    this.state[j] = this.state[j+1]
                    this.state[j] = temp3
                }
            }
        }
    }


    render() {
        console.log(this.state.deadlines)
        this.sortDeadlines()
        return(
            <div>
                <h2 className="header">Deadlines:</h2>

                <div>
                    {
                        this.state.deadlines.map(item => {
                            return(
                                <p className="deadlineRow">
                                    <span className="deadlineRowDue">{item.due} &nbsp; | &nbsp; {item.title}</span>
                                    <span className="deadlineRowView"><a className="link" href={item.link}>View Assignment</a></span>
                                </p>)
                        })
                    }
                </div>
            </div>

        )
    }
}
export default Deadlines