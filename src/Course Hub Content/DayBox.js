import React from "react"

const DayBox = (props) => {
    const day = props.day
    const classes = props.classes

    return(
        <div>
            <h2>{day}</h2>
            {classes.map(item => {
                return(<p>{item}</p>)
            })}
        </div>

    )
}
export default DayBox