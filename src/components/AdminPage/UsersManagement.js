import React, { Component } from "react"
import LoadingSpinner from "../LoadingSpinner"

export class UsersManagement extends Component {
	state = { users: [], foundUser: null, isLoading: true, inputValue: "", error: null }

	onChange = (e) => {
		this.setState({ inputValue: e.currentTarget.value })
	}

	onSubmit = async (e) => {
		e.preventDefault()

		const id = this.state.inputValue.trim()

		const userSnapshot = await this.props.firebase.db
			.collection("users")
			.doc(id)
			.get()
		const foundUser = userSnapshot.data()

		const error = foundUser ? null : new Error("User not found")

		this.setState({ error, inputValue: "", foundUser })
	}

	componentDidMount() {
		this.removeListener = this.props.firebase.db
			.collection("users")
			.onSnapshot(async (usersSnapshot) => {
				const users = usersSnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))
				this.setState({ users, isLoading: false })
			})
	}

	componentWillUnmount() {
		this.removeListener && this.removeListener()
	}

	render() {
		const { isLoading, users, error, inputValue, foundUser } = this.state

		return isLoading ? (
			<LoadingSpinner />
		) : (
			<div>
				<hr />
				<h2>Users</h2>
				{users.length > 0 && (
					<ul>
						{users.map((user) => (
							<li>
								{user.name} {user.email} <strong>{user.uid}</strong>
								{/* <button onClick={() => this.onDelete(user.id)}>X</button> */}
							</li>
						))}
					</ul>
				)}
				<h4>Find by ID</h4>
				<form onSubmit={this.onSubmit}>
					<input type="text" onChange={this.onChange} value={inputValue} />
					<input type="submit" />
				</form>
				{foundUser && (
					<div>
						<h3>Found User</h3>
						{foundUser.name} {foundUser.email}
					</div>
				)}

				{error && <div>{error.message}</div>}
			</div>
		)
	}
}

export default UsersManagement
