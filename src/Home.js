import React from "react"
import { API } from "aws-amplify"
import { Link } from "react-router-dom"

export default class Home extends React.Component {
	state = {
		items: null
	}
	componentDidMount = async () => {
		let data = await API.get("items", "/items")
		this.setState({ items: data.items })
	}

	render() {
		const { items } = this.state
		return (
			<div>
				<h3>Home</h3>
				{/* TODO: prawidłowa odmiana 'przedmiotów' */}
				{items && <h4>{items.length} Wyniki</h4>}
				{items &&
					items.map((item) => (
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
										{new Date(item.createdAt).toLocaleString()}
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
