import React, { Component } from "react"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import ProfilePicture from "../ProfilePicture"
import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { ellipsis } from "../../style-utils"
import UserRating from "../AccountPage/UserRating"
import moment from "moment"

import { ROUTES } from "../../constants"

const Name = styled.div`
	font-size: ${(p) => (p.nameOnly ? "1.22rem" : "1.1rem")};
	${ellipsis}
`

const InfoContainer = styled.div`
	padding: 2px 0 0 8px;
	overflow: hidden;
	${(p) => p.vertical && "text-align: center; padding-top: 8px;"}
`

const Date = styled.div`
	font-size: 0.8rem;
	font-weight: 300;
`

const Container = styled.div`
	margin: 10px 0;
	font-weight: 500;
	display: flex;
	flex-direction: ${(p) => (p.vertical ? "column" : "row")};
	${(p) => p.vertical && "align-items: center;"}
`

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
			this.props.onError(error)
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
								<Date>
									W serwisie od {moment(window.Date.now()).diff(user.userSince, "days")}{" "}
									dni
								</Date>
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
