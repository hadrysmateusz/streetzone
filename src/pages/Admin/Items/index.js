import React from "react"
import { Link } from "react-router-dom"

import LoadingSpinner from "../../../components/LoadingSpinner"
import { TextBlock } from "../../../components/StyledComponents"

import AddItems from "./AddItems"

import { ROUTES } from "../../../constants"
import { withFirebase } from "../../../components/Firebase"

export class ItemsManagement extends React.Component {
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
				{error && <div>{error.message}</div>}

				<TextBlock size="xl" bold>
					Items
				</TextBlock>

				<TextBlock size="m" color="gray0">
					Add item
				</TextBlock>

				<AddItems firebase={this.props.firebase} />

				<TextBlock size="m" color="gray0">
					Find by ID
				</TextBlock>

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

				<TextBlock size="m" color="gray0">
					All items
				</TextBlock>

				{items.length > 0 && (
					<ul>
						{items.map((item) => {
							return (
								<li>
									<Link to={ROUTES.ITEM_DETAILS.replace(":id", item.id)}>
										{item.name} {item.email} <strong>{item.uid}</strong>
									</Link>
									<button onClick={() => this.onDelete(item.id)}>X</button>
								</li>
							)
						})}
					</ul>
				)}
			</div>
		)
	}
}

export default withFirebase(ItemsManagement)
