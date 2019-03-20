import React from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Flex } from "rebass"
import { Link } from "react-router-dom"

import ProfilePicture from "../ProfilePicture"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import Button, { ButtonContainer } from "../Button"
import UserRating from "../UserRating"
import { MainInfoContainer, InfoContainer, SecondContainer } from "./StyledComponents"
import { HeartButton } from "../SaveButton"
import { ROUTES } from "../../constants"
import { TextBlock, HorizontalContainer } from "../StyledComponents"
import SingleValueDisplay from "../SingleValueDisplay"

const MainInfo = ({ user, isAuthorized, userId }) => {
	return (
		<MainInfoContainer>
			<div>
				<ProfilePicture url={getProfilePictureURL(user, "M")} size="170px" />
			</div>
			<InfoContainer>
				<Flex alignItems="center">
					<TextBlock bold size="l" style={{ marginRight: "var(--spacing2)" }}>
						{user.name}
					</TextBlock>
					<UserRating feedback={user.feedback} />
				</Flex>

				<HorizontalContainer gap="3">
					<SingleValueDisplay title="W serwisie od">
						{moment(user.userSince).format("D.MM.YYYY")}
					</SingleValueDisplay>

					{user.city && (
						<SingleValueDisplay title="Miasto">{user.city}</SingleValueDisplay>
					)}

					<SingleValueDisplay title="E-Mail">{user.email}</SingleValueDisplay>

					{user.phone && (
						<SingleValueDisplay title="Nr Telefonu">{user.phone}</SingleValueDisplay>
					)}
				</HorizontalContainer>

				<TextBlock>{user.info}</TextBlock>
			</InfoContainer>
			<SecondContainer>
				{isAuthorized ? (
					<ButtonContainer alignRight noMargin>
						<Button as={Link} to={ROUTES.ACCOUNT_SETTINGS.replace(":id", userId)}>
							<span>Edytuj Profil</span>
						</Button>
						<Button>
							<FontAwesomeIcon icon="ellipsis-h" size="lg" />
						</Button>
					</ButtonContainer>
				) : (
					<ButtonContainer alignRight noMargin>
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
					</ButtonContainer>
				)}
			</SecondContainer>
		</MainInfoContainer>
	)
}

export default MainInfo
