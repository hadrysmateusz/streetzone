import React from "react"

import LoadingSpinner from "../../../components/LoadingSpinner"
import { withFirebase } from "../../../components/Firebase"
import { TextBlock } from "../../../components/StyledComponents"

export class UsersManagement extends React.Component {
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
				{error && <div>{error.message}</div>}

				<TextBlock size="xl" bold>
					Users
				</TextBlock>

				<TextBlock size="m" color="gray0">
					Find by ID
				</TextBlock>

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

				<TextBlock size="m" color="gray0">
					All users
				</TextBlock>

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
			</div>
		)
	}
}

export default withFirebase(UsersManagement)
