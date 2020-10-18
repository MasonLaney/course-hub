import React from "react"

const DayBox = (props) => {
    const classes = props.day
    return(
        {props.dayArr.map(item => {
            return(<p>{item}</p>)
        })})
}