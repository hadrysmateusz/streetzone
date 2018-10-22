import React from "react"
import { API } from "aws-amplify"

export default class Home extends React.Component {
	state = {
		items: []
	}
	componentDidMount = async () => {
		let data = await API.get("items", "/items")
		this.setState({ items: data.Items })
		console.log(this.state)
	}

	render() {
		return (
			<div>
				<h3>Home</h3>
				{this.state.items.map((item) => (
					<div>{item.name}</div>
				))}
			</div>
		)
	}
}
