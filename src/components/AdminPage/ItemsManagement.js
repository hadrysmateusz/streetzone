import React, { Component } from "react"
import LoadingSpinner from "../LoadingSpinner"

export class ItemsManagement extends Component {
	state = { items: [], foundItem: null, isLoading: true, inputValue: "", error: null }

	onChange = (e) => {
		this.setState({ inputValue: e.currentTarget.value })
	}

	onSubmit = async (e) => {
		e.preventDefault()

		const id = this.state.inputValue.trim()

		const itemSnapshot = await this.props.firebase.db
			.collection("items")
			.doc(id)
			.get()
		const foundItem = itemSnapshot.data()

		const error = foundItem ? null : new Error("item not found")

		this.setState({ error, inputValue: "", foundItem })
	}

	onDelete = async (id) => {
		this.props.firebase.db
			.collection("items")
			.doc(id)
			.delete()
	}

	componentDidMount() {
		this.removeListener = this.props.firebase.db
			.collection("items")
			.onSnapshot(async (itemsSnapshot) => {
				const items = itemsSnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))
				this.setState({ items, isLoading: false })
			})
	}

	componentWillUnmount() {
		this.removeListener && this.removeListener()
	}

	render() {
		const { isLoading, items, error, inputValue, foundItem } = this.state

		return isLoading ? (
			<LoadingSpinner />
		) : (
			<div>
				<hr />
				<h2>Items</h2>
				{items.length > 0 && (
					<ul>
						{items.map((item) => (
							<li>
								{item.name} {item.email} <strong>{item.uid}</strong>
								<button onClick={() => this.onDelete(item.id)}>X</button>
							</li>
						))}
					</ul>
				)}
				<h4>Find by ID</h4>
				<form onSubmit={this.onSubmit}>
					<input type="text" onChange={this.onChange} value={inputValue} />
					<input type="submit" />
				</form>
				{foundItem && (
					<div>
						<h3>Found item</h3>
						{foundItem.name} {foundItem.email}
					</div>
				)}

				{error && <div>{error.message}</div>}
			</div>
		)
	}
}

export default ItemsManagement
