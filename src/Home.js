import React from "react"
import { API } from "aws-amplify"
import { Link } from "react-router-dom"

export default class Home extends React.Component {
	state = {
		items: []
	}
	componentDidMount = async () => {
		let data = await API.get("items", "/items")
		this.setState({ items: data.Items })
	}

	render() {
		return (
			<div>
				<h3>Home</h3>
				{this.state.items.map((item) => (
					<div key={item.itemId}>
						<Link to={"/i/" + item.itemId}>
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
								<div style={{ fontSize: "15px", fontWeight: "bold" }}>
									{"Dodano: " + new Date(item.createdAt).toLocaleString()}
								</div>
								<p>{item.description}</p>
							</div>
						</Link>
					</div>
				))}
			</div>
		)
	}
}
