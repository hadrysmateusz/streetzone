import React, { Component } from "react"
import API from "@aws-amplify/api"

import styles from "./UserPreview.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LoadingSpinner from "./components/LoadingSpinner"
import errorLog from "./libs/errorLog"

export class UserPreview extends Component {
	state = {
		user: null,
		isLoading: true
	}

	componentDidMount = async () => {
		let { id } = this.props
		let user

		try {
			user = await API.get("items", `/users/${id}`)
		} catch (e) {
			errorLog(e, "Wystąpił problem podczas wyszukiwania użytkownika.")
		}

		this.setState({ isLoading: false, user })
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
						<a href={`http://localhost:3000/profil/${this.props.id}`}>
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

export default UserPreview
