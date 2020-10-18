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
    componentDidMount() {
        this.setState()
        data.map(item => {
            var newStateArray = this.state.deadlines;

            newStateArray.push({
                submitted: item.submitted,
                title: item.title,
                due: item.due,
                link: item.link,
                open: item.open,
                key: item.key
            })
            this.setState({schedule: newStateArray})
        })
    }

    render() {
        console.log(this.state.deadlines)
        return(
            <div>
                <h1>Deadlines:</h1>
                {
                    this.state.deadlines.map(item => {
                        return(<p>Assignment #{item.key}: {item.due}</p>)
                    })
                }
            </div>

        )
    }
}
export default Deadlines