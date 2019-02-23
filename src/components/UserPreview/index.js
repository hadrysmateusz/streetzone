import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import moment from "moment"

import ProfilePicture from "../ProfilePicture"
import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import UserRating from "../UserRating"
import { ROUTES } from "../../constants"
import { DateContainer, Name, InfoContainer, Container } from "./StyledComponents"

class UserPreview extends Component {
	state = {
		user: null,
		isLoading: true,
		error: null
	}

	componentDidMount = async () => {
		let { id, firebase } = this.props
		let { user, error } = await firebase.getUserData(id)
		if (error) {
			this.props.onError && this.props.onError(error)
		}
		this.setState({ user, error, isLoading: false })
	}

	render() {
		const { isLoading, user, error } = this.state
		if (error) {
			return null
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
								<DateContainer>
									W serwisie od {moment(Date.now()).diff(user.userSince, "days")} dni
								</DateContainer>
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
