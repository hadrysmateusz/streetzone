import React, { Component } from "react"

import styles from "./UserPreview.module.scss"

import { withFirebase } from "../Firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LoadingSpinner from "../LoadingSpinner"

import { ROUTES } from "../../constants"

export class UserPreview extends Component {
	state = {
		user: null,
		isLoading: true
	}

	componentDidMount = async () => {
		let { id, firebase } = this.props
		try {
			let user = (await firebase.user(id).get()).data()
			if (!user) throw new Error("Couldn't find the user")
			this.setState({ user })
		} catch (error) {
			console.log(error)
		}
		this.setState({ isLoading: false })
	}

	render() {
		const { isLoading, user } = this.state
		if (!isLoading && user) {
			return (
				<div className={styles.container}>
					<div className={styles.avatar}>
						{/* TODO: replace the icon with avatar */}
						<FontAwesomeIcon icon="user-circle" size="2x" />
					</div>
					<div className={styles.name}>
						<a href={ROUTES.ACCOUNT.replace(":id", this.props.id)}>
							{user.name}
						</a>
					</div>
				</div>
			)
		} else {
			return <LoadingSpinner />
		}
	}
}

export default withFirebase(UserPreview)
