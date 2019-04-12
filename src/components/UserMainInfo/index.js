import React from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Flex } from "rebass"
import { Link } from "react-router-dom"

import ProfilePicture from "../ProfilePicture"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import Button, { ButtonContainer } from "../Button"
import UserRating from "../UserRating"
import {
	MainInfoContainer,
	InfoContainer,
	SecondContainer,
	TopContainer
} from "./StyledComponents"
import { HeartButton } from "../SaveButton"
import { ROUTES } from "../../constants"
import { TextBlock, HorizontalContainer } from "../StyledComponents"
import SingleValueDisplay from "../SingleValueDisplay"
import useContentToggle from "../../hooks/useContentToggle"

const MainInfo = ({ user, isAuthorized, userId }) => {
	const { getToggleProps, getContentProps } = useContentToggle(false)

	return (
		<MainInfoContainer>
			<TopContainer>
				<div>
					<ProfilePicture url={getProfilePictureURL(user, "M")} size="150px" />
				</div>
				<InfoContainer>
					<TextBlock bold size="l">
						{user.name}
					</TextBlock>
					<HorizontalContainer gap="3">
						<SingleValueDisplay title="W serwisie od">
							{moment(user.userSince).format("D.MM.YYYY")}
						</SingleValueDisplay>

						{user.feedback && (
							<SingleValueDisplay title="Opinie">
								{Array.from(user.feedback).length}
							</SingleValueDisplay>
						)}

						{user.city && (
							<SingleValueDisplay title="Miasto">{user.city}</SingleValueDisplay>
						)}
					</HorizontalContainer>

					<TextBlock color="gray0" size="xs" {...getToggleProps()}>
						więcej informacji
					</TextBlock>
					<TextBlock color="black50" {...getContentProps()}>
						{user.info}
					</TextBlock>
				</InfoContainer>
			</TopContainer>
			<SecondContainer>
				<ButtonContainer alignRight noMargin>
					{isAuthorized ? (
						<>
							<Button as={Link} to={ROUTES.ACCOUNT_SETTINGS.replace(":id", userId)}>
								<span>Edytuj Profil</span>
							</Button>
							<Button>
								<FontAwesomeIcon icon="ellipsis-h" size="lg" />
							</Button>
						</>
					) : (
						<>
							<Button primary>
								<FontAwesomeIcon icon={["far", "envelope"]} size="lg" />
								<span>Wyślij wiadomość</span>
							</Button>
							<Button>
								<HeartButton id={userId} type="user" />
							</Button>
							<Button>
								<FontAwesomeIcon icon="ellipsis-h" size="lg" />
							</Button>
						</>
					)}
				</ButtonContainer>
			</SecondContainer>
		</MainInfoContainer>
	)
}

export default MainInfo
