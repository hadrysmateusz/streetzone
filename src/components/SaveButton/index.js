import React, { Component } from "react"
import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import { compose } from "recompose"
import { ROUTES } from "../../constants"
import Modal from "../Modal"
import { withGlobalContext } from "../GlobalContext"

function getPropertyName(type) {
	if (type === "item") {
		return "savedItems"
	} else if (type === "user") {
		return "followedUsers"
	} else {
		throw new Error("The SaveButton needs a type")
	}
}

const activeSaveButton = css`
	.filled {
		display: block;
	}
	.outline {
		display: none;
	}
`
const HeartButtonContainer = styled.div`
	background: rgba(255, 255, 255, 1);
	padding: 4px;
	color: ${(p) => p.theme.colors.black[0]};
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	transition: transform 0.2s ease;

	font-size: ${(p) => 10 * (p.scale || 1)}px;

	.filled {
		color: ${(p) => p.theme.colors.accent};
		display: none;
	}

	:hover {
		transform: scale(1.1);
	}

	${(p) => p.active && activeSaveButton}
`

class SaveButtonBase extends Component {
	state = {
		isSaved: false,
		isLoginModalVisible: false
	}

	componentDidMount = () => {
		this.checkIfSaved()
	}

	componentDidUpdate = (prevProps) => {
		if (prevProps.authUser !== this.props.authUser) {
			this.checkIfSaved()
		}
	}

	checkIfSaved = () => {
		const { authUser, id, type } = this.props

		// Get the property to modify based on type of button
		const propertyName = getPropertyName(type)

		const isSaved =
			authUser && authUser[propertyName] && authUser[propertyName].includes(id)

		this.setState({ isSaved })
	}

	onClick = (e) => {
		e.preventDefault()

		if (this.props.authUser) {
			this.toggleSaved()
		} else {
			this.props.globalContext.openModal(ROUTES.SIGN_UP)
		}
	}

	toggleSaved = async () => {
		const { id, authUser, firebase, type = "item" } = this.props
		if (authUser) {
			const wasSaved = this.state.isSaved
			// Assume the operation will be successful and set state early
			this.setState({ isSaved: !wasSaved })

			// Get the property to modify based on type of button
			const propertyName = getPropertyName(type)

			try {
				// get the old list
				const oldList = authUser[propertyName] || []

				// either delete or add to the list
				const newList = wasSaved ? oldList.filter((a) => a !== id) : [...oldList, id]

				// update the db
				await firebase.currentUser().update({ [propertyName]: newList })
			} catch (error) {
				console.log(error)
			}

			// This will make sure the state is correct regardless of the operation's success
			this.checkIfSaved()
		}
	}

	render = () => {
		return (
			<HeartButtonContainer
				className={this.props.className}
				active={this.state.isSaved}
				onClick={this.onClick}
				scale={this.props.scale}
			>
				<div className="fa-layers fa-fw">
					<FontAwesomeIcon className="outline" icon={["far", "heart"]} />
					<FontAwesomeIcon className="filled" icon="heart" />
				</div>
				<Modal>
					<h2>Zaloguj się</h2>
				</Modal>
			</HeartButtonContainer>
		)
	}
}

const HeartButton = compose(
	withAuthentication,
	withFirebase,
	withGlobalContext
)(SaveButtonBase)

export { HeartButton }
