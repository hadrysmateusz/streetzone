import React, { Component } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../UserSession"
import { compose } from "recompose"

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

	.filled {
		color: ${(p) => p.theme.colors.accent};
		display: none;
	}

	:hover {
		${activeSaveButton}
	}

	${(p) => p.active && activeSaveButton}
`

export class SaveButtonBase extends Component {
	state = {
		isSaved: false
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

	toggleSaved = async (e) => {
		e.preventDefault()
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

	render() {
		return (
			<HeartButtonContainer
				className={this.props.className}
				active={this.state.isSaved}
				onClick={this.toggleSaved}
			>
				<div className="fa-layers fa-fw">
					<FontAwesomeIcon className="outline" icon={["far", "heart"]} />
					<FontAwesomeIcon className="filled" icon="heart" />
				</div>
			</HeartButtonContainer>
		)
	}
}

const HeartButton = compose(
	withAuthentication,
	withFirebase
)(SaveButtonBase)

export { HeartButton }
