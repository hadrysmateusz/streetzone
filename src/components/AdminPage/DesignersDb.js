import React, { Component } from "react"
import LoadingSpinner from "../LoadingSpinner"
import shortid from "shortid"

export class DesignersDb extends Component {
	state = { items: [], isLoading: true, inputValue: "", error: null }

	onChange = (e) => {
		this.setState({ inputValue: e.currentTarget.value })
	}

	onSubmit = (e) => {
		e.preventDefault()

		const id = shortid.generate()
		const label = this.state.inputValue.trim()

		this.setState({ error: null, inputValue: "" })

		this.props.firebase.db
			.collection("designers")
			.doc(id)
			.set({ label, id })
	}

	onDelete = (id) => {
		try {
			this.props.firebase.db
				.collection("designers")
				.doc(id)
				.delete()
		} catch (error) {
			this.setState({ error })
		}
	}

	componentDidMount() {
		this.removeListener = this.props.firebase.db
			.collection("designers")
			.onSnapshot(async (itemsSnapshot) => {
				const items = itemsSnapshot.docs.map((doc) => doc.data())
				this.setState({ items, isLoading: false })
			})
	}

	componentWillUnmount() {
		this.removeListener && this.removeListener()
	}

	render() {
		const { isLoading, items, error, inputValue } = this.state

		return isLoading ? (
			<LoadingSpinner />
		) : (
			<div>
				<h2>Designers</h2>
				{items.length > 0 && (
					<ul>
						{items.map((item) => (
							<li>
								{item.label}
								<button onClick={() => this.onDelete(item.id)}>X</button>
							</li>
						))}
					</ul>
				)}
				<h4>Add</h4>
				<form onSubmit={this.onSubmit}>
					<input type="text" onChange={this.onChange} value={inputValue} />
					<input type="submit" />
				</form>
				{error && <div>{error.message}</div>}
			</div>
		)
	}
}

export default DesignersDb
