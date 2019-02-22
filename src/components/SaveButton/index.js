import React, { Component } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import { compose } from "recompose"
import { ROUTES } from "../../constants"
import Modal from "../Modal"
import { withGlobalContext } from "../GlobalContext"

const activeSaveButton = css`
	.filled {
		display: block;
	}
	.outline {
		display: none;
	}
`
const HeartButtonContainer = styled.div`
	font-size: 1.15rem;
	background: rgba(255, 255, 255, 1);
	padding: 5px;
	color: ${(p) => p.theme.colors.black[0]};
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	transition: transform 0.2s ease;

	.filled {
		color: ${(p) => p.theme.colors.accent};
		display: none;
	}

	:hover {
		transform: scale(1.1);
	}

	${(p) => p.active && activeSaveButton}
`

export class SaveButtonBase extends Component {
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
		const { authUser, itemId } = this.props
		const isSaved =
			authUser && authUser.savedItems && authUser.savedItems.includes(itemId)
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
		const { itemId, authUser, firebase } = this.props
		if (authUser) {
			const wasSaved = this.state.isSaved
			// Assume the operation will be successful and set state early
			this.setState({ isSaved: !wasSaved })

			try {
				const oldSaved = authUser.savedItems || []

				// either delete or add the item to the list
				const newSaved = wasSaved
					? oldSaved.filter((a) => a !== itemId)
					: [...oldSaved, itemId]

				// update the db
				await firebase.currentUser().update({ savedItems: newSaved })
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
