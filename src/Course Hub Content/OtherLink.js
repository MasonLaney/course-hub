import React, {Component} from "react"

class OtherLink extends Component {

	constructor() {
		super();
		this.state = {
		};
	}

	addLink() {
		this.setState()
	}

	render() {
		return (
			<div className="otherLink">

				<h2 className="header">Links:</h2>

				<div>
					{
						this.props.classes.map(item => {
							return(
								<div>
									<p className="otherLinkClass">{item.name}</p>

									<form onSubmit={this.addLink} className="addLinkBox">
										<label>
											Name:
											<input name="name" type="text" placeholder="" />
										</label>
										<p></p>
										<label>
											Link:
											<input name="link" type="url" placeholder="" />
										</label>
										<button type="submit" className="addLink">Add Link</button>
									</form>

									<p>{item.link}</p>
									<a href={item.link}><button className="">{item.name}</button></a>
								</div>
								)
						})
					}
				</div>

			</div>
		)
	}
}

export default OtherLink
