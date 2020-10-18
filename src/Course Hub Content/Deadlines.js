import React, {Component}  from "react"
import data from "./test_data_deadline_list.json"

class Deadlines extends Component {

    constructor() {
        super();
        this.state = {
            deadlines: []
        };
    }

    //fetch schedule data when
    /*
    TODO 1: delete assignments with due date before current (today's) date
    TODO 2: put all the due dates in another array to sort
    TODO 3: sort by date
     */
    componentDidMount() {
        this.setState()
        data.map(item => {
            var newStateArray = this.state.deadlines;
            if(item.submitted === "Not Started") {
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
                            return(<p>{item.title} {item.due}</p>)
                        })
                    }
                </div>
            </div>

        )
    }
}
export default Deadlines