import React, { useState, useEffect } from "react"
import { withRouter, Link } from "react-router-dom"
import moment from "moment"
import styled, { css } from "styled-components/macro"

import { Button, ButtonContainer } from "../Button"
import ProfilePicture from "../ProfilePicture"
import LoadingSpinner from "../LoadingSpinner"
import UserRating from "../UserRating"
import ContactModal from "../ContactModal"
import InfoItem from "../InfoItem"
import { SaveIconButton } from "../SaveButton"

import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { useFirebase, useUser } from "../../hooks"
import { route } from "../../utils"

export const DetailsContainer = styled.div`
	display: flex;
	align-content: center;
	margin-bottom: var(--spacing3);

	> * + * {
		margin-left: var(--spacing3);
		@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
			margin-left: var(--spacing4);
		}
	}
`

const UsersList = styled.div`
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: 100%;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`

const Container = styled.div`
	background: white;
	border: 1px solid var(--gray75);
	color: var(--black0);
	padding: var(--spacing3);
	min-height: 238px;
	.top-container {
		display: flex;
		align-items: center;
		.name {
			font-size: var(--fs-l);
			font-weight: bold;
			margin-left: var(--spacing2);
		}
		.follow-button-container {
			margin-left: auto;
			padding: var(--spacing2);
		}
	}
	.info-container {
		margin: var(--spacing3) 0;
	}
	.error {
		color: var(--gray0);
		text-align: center;
		padding: var(--spacing4) 0;
	}
`

const BigUserPreview = withRouter(({ userId }) => {
	const [user, error] = useUser(userId)

	if (error) {
		return (
			<Container>
				<div className="error">Wystąpił błąd</div>
			</Container>
		)
	}

	if (!user) {
		return (
			<Container>
				<LoadingSpinner />
			</Container>
		)
	}

	const profilePictureUrl = getProfilePictureURL(user, "S")
	const numDays = moment().diff(user.userSince, "days")
	// TODO: consider a different way to implement items counter
	// const numItems = user.items ? user.items.length : 0
	const numOpinions = user.feedback ? user.feedback.length : 0

	return (
		<Container>
			<div className="top-container">
				<ProfilePicture url={profilePictureUrl} size="40px" />
				<div className="name">{user.name}</div>
				<div className="follow-button-container">
					<SaveIconButton id={userId} type="user" scale={1.8} />
				</div>
			</div>
			<DetailsContainer
				css={`
					margin-top: var(--spacing3);
				`}
			>
				{/* TODO: avg rating */}
				<InfoItem size="m" name="W serwisie od">
					{numDays} dni
				</InfoItem>
				<InfoItem size="m" name="Opinie">
					{numOpinions}
				</InfoItem>
				{/* <InfoItem size="m" name="Przedmioty">
					{numItems}
				</InfoItem> */}
				{user.city && <InfoItem name="Miasto">{user.city}</InfoItem>}
			</DetailsContainer>

			<ButtonContainer vertical noMargin>
				<ContactModal userId={userId}>
					{({ open }) => (
						<Button primary fullWidth onClick={open}>
							Kontakt
						</Button>
					)}
				</ContactModal>
				<Button fullWidth as={Link} to={route("ACCOUNT_ITEMS", { id: userId })}>
					Zobacz Profil
				</Button>
			</ButtonContainer>
		</Container>
	)
})

export const UsersView = ({ users }) => (
	<UsersList>
		{users && users.map((userId) => <BigUserPreview key={userId} userId={userId} />)}
	</UsersList>
)

export default BigUserPreview
