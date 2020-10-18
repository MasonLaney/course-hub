import React from "react"

const OtherLink = (props) => {
	const className = props.className
	const name = props.name
	const link = props.link

	return (
		<div className="otherLink">

			<a href={props.link}><button className="otherLinkButton">props.name</button></a>

		</div>
	)
}

export default OtherLink
