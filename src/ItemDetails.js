import React, { Component } from "react"
import { API } from "aws-amplify"

export default class ItemDetails extends Component {
	state = {
		item: {}
	}
	componentDidMount = () => {
		console.log(this.props)
		let itemId = this.props.match.params.id
		let item = API.get("items", `items/${itemId}`)
		this.setState({ item })
	}

	render() {
		const item = this.state.item
		return (
			<div className="ItemDetails">
				<h3>ItemDetails</h3>
				<div>
					<h4>
						{item.name}
						<span style={{ color: "#adadad" }}>
							{" "}
							- {item.price}
							zł
						</span>
					</h4>
					<div style={{ fontSize: "18px", fontWeight: "bold" }}>
						{item.designers.join(" & ")}
					</div>
					<p>{item.description}</p>
				</div>
			</div>
		)
	}
}
