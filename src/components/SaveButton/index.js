import React, { Component } from "react"
import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import { compose } from "recompose"
import { ROUTES } from "../../constants"
import Modal from "../Modal"
import { withGlobalContext } from "../GlobalContext"
import { Button } from "../Button"

export const TYPE = {
	ITEM: "ITEM",
	USER: "USER"
}

const TYPE_REQUIRED_ERR = "SaveButton needs a type"

function getPropertyName(type) {
	if (type === TYPE.ITEM) {
		return "savedItems"
	} else if (type === TYPE.USER) {
		return "followedUsers"
	} else {
		return null
	}
}

const HeartButtonContainer = styled.div`
	background: rgba(255, 255, 255, 1);
	padding: var(--spacing1);
	color: ${(p) => p.theme.colors.black[0]};
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	transition: transform 0.2s ease;

	font-size: ${(p) => 10 * (p.scale || 1)}px;

	.filled {
		color: ${(p) => p.theme.colors.accent};
	}

	:hover {
		transform: scale(1.1);
	}
`

class SaveButtonLogicBase extends Component {
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

		if (!propertyName) {
			this.setState({ error: TYPE_REQUIRED_ERR })
			return
		}

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

			if (!propertyName) {
				this.setState({ error: TYPE_REQUIRED_ERR })
				return
			}

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
		if (this.state.error) {
			console.log(this.state.error)
			return null
		}

		return this.props.children({
			isSaved: this.state.isSaved,
			onClick: this.onClick,
			scale: this.props.scale
		})
	}
}

const SaveButtonLogic = compose(
	withAuthentication,
	withFirebase,
	withGlobalContext
)(SaveButtonLogicBase)

export const HeartButton = ({ type, id, ...props }) => {
	return (
		<SaveButtonLogic type={type} id={id}>
			{({ isSaved, onClick, scale }) => {
				return (
					<HeartButtonContainer onClick={onClick} scale={scale} {...props}>
						<div className="fa-layers fa-fw">
							{isSaved ? (
								<FontAwesomeIcon className="filled" icon="heart" />
							) : (
								<FontAwesomeIcon className="outline" icon={["far", "heart"]} />
							)}
						</div>
						<Modal>
							<h2>Zaloguj się</h2>
						</Modal>
					</HeartButtonContainer>
				)
			}}
		</SaveButtonLogic>
	)
}

export const SaveButton = ({
	text = "Zapisz",
	savedText = "Zapisano",
	type,
	id,
	...props
}) => {
	return (
		<SaveButtonLogic type={type} id={id}>
			{({ isSaved, onClick }) => {
				return (
					<Button onClick={onClick} {...props}>
						<div className="fa-layers fa-fw">
							{isSaved ? (
								<FontAwesomeIcon className="filled" icon="heart" size="xs" />
							) : (
								<FontAwesomeIcon className="outline" icon={["far", "heart"]} size="xs" />
							)}
						</div>{" "}
						{isSaved ? savedText : text}
					</Button>
				)
			}}
		</SaveButtonLogic>
	)
}
