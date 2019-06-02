import React, { useState, useEffect } from "react"
import { withRouter, Link } from "react-router-dom"
import moment from "moment"
import styled, { css } from "styled-components/macro"

import { Button } from "../Button"
import ProfilePicture from "../ProfilePicture"
import LoadingSpinner from "../LoadingSpinner"
import UserRating from "../UserRating"

import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { ROUTES } from "../../constants"
import { useFirebase, useUser } from "../../hooks"
import { route } from "../../utils"

const Container = styled.div`
	background: var(--almost-white);
	color: var(--black75);
	padding: var(--spacing3);
	.top-container {
		display: flex;
		align-items: center;
		.name {
			font-size: var(--fs-l);
			font-weight: bold;
			margin-left: var(--spacing2);
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

const InfoItem = ({ name, children }) => (
	<div
		css={css`
			display: flex;
			justify-content: space-between;
			.value {
				font-weight: bold;
			}
		`}
	>
		<div>{name}</div>
		<div className="value">{children}</div>
	</div>
)

const NewUserPreview = withRouter(({ id }) => {
	const [user, error] = useUser(id)

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

	return (
		<Container>
			<div className="top-container">
				<ProfilePicture url={profilePictureUrl} size="40px" />
				<div className="name">{user.name}</div>
			</div>
			<div className="info-container">
				<InfoItem name="W serwisie od">
					{moment().diff(user.userSince, "days")} dni
				</InfoItem>
				{user.city && <InfoItem name="Miasto">{user.city}</InfoItem>}
			</div>
			<Button as={Link} to={route("ACCOUNT_ITEMS", { id })}>
				Zobacz Profil
			</Button>
		</Container>
	)
})

export default NewUserPreview
