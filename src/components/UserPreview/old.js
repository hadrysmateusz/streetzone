// DEPRECATED

import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import moment from "moment"
import styled from "styled-components/macro"

import ProfilePicture from "../ProfilePicture"
import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import UserRating from "../UserRating"
import { ROUTES } from "../../constants"
import { Name, InfoContainer, Container } from "./StyledComponents"

class UserPreview extends Component {
	state = {
		user: null,
		isLoading: true,
		error: null
	}

	componentDidMount = async () => {
		let { id, firebase } = this.props
		if (this.props.user) {
			this.setState({ user: this.props.user, isLoading: false })
		} else {
			let { user, error } = await firebase.getUserData(id)
			if (error) {
				this.props.onError && this.props.onError(error)
			}
			this.setState({ user, error, isLoading: false })
		}
	}

	render() {
		const { isLoading, user } = this.state

		/* error can also be provided by a parent component 
		if it is controling the fetching of user data */
		if (this.state.error || this.props.error) {
			return (
				<Container vertical={this.props.vertical}>
					<ProfilePicture size={this.props.pictureSize || "60px"} url="" inline />
					<InfoContainer vertical={this.props.vertical}>
						<Name nameOnly={this.props.nameOnly} removed>
							<em>Nie znaleziono użytkownika</em>
						</Name>
					</InfoContainer>
				</Container>
			)
		} else if (!isLoading && user) {
			return (
				<Container
					vertical={this.props.vertical}
					as="a"
					href={ROUTES.ACCOUNT_ITEMS.replace(":id", this.props.id)}
				>
					<ProfilePicture
						size={this.props.pictureSize || "60px"}
						url={getProfilePictureURL(user, "M")}
						inline
					/>
					<InfoContainer vertical={this.props.vertical}>
						<Name nameOnly={this.props.nameOnly}>{user.name}</Name>
						{!this.props.nameOnly && (
							<>
								<div>
									W serwisie od {moment(Date.now()).diff(user.userSince, "days")} dni
								</div>
								<div>
									<UserRating size="15px" feedback={user.feedback} />
								</div>
							</>
						)}
					</InfoContainer>
				</Container>
			)
		} else {
			return <LoadingSpinner fixedHeight />
		}
	}
}

export default compose(
	withRouter,
	withFirebase
)(UserPreview)
