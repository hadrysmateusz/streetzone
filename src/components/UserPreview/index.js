import React, { Component } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { ProfilePicture } from "../Basics"
import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"

import { ROUTES } from "../../constants"

const Name = styled.div`
	font-size: 1.22rem;
	padding: 0 10px;
	height: 100%;
`

const Container = styled.div`
	margin: 10px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
`

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
				<Container>
					<div>
						{user.profilePictureURL ? (
							<ProfilePicture size="80px" url={user.profilePictureURL} inline />
						) : (
							<FontAwesomeIcon
								icon="user-circle"
								style={{ width: "80px", height: "80px", color: "#cacaca" }}
							/>
						)}
					</div>
					<Name>
						<a href={ROUTES.ACCOUNT.replace(":id", this.props.id)}>{user.name}</a>
					</Name>
				</Container>
			)
		} else {
			return <LoadingSpinner />
		}
	}
}

export default compose(
	withRouter,
	withFirebase
)(UserPreview)
