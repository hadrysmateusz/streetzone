import React from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ProfilePicture from "../ProfilePicture"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import Button, { ButtonContainer } from "../Button"
import UserRating from "../UserRating"
import {
	MainInfoContainer,
	InfoContainer,
	SecondContainer,
	SeparatedContainer
} from "./StyledComponents"
import { HeartButton } from "../SaveButton"
import { ROUTES } from "../../constants"
import Link from "react-router-dom/Link"
import { TextBlock } from "../StyledComponents"
import SingleValueDisplay from "../SingleValueDisplay"
import { Flex } from "rebass"

const MainInfo = ({ user, isUserOwner, userId }) => {
	return (
		<MainInfoContainer>
			<div>
				<ProfilePicture url={getProfilePictureURL(user, "M")} size="170px" />
			</div>
			<InfoContainer>
				<Flex alignItems="center">
					<TextBlock bold>{user.name}</TextBlock>
					<UserRating feedback={user.feedback} />
				</Flex>
				<Flex>
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
				</Flex>
			</InfoContainer>
			<SecondContainer>
				<SeparatedContainer>
					<span>
						<strong>{user.followers || 0}</strong> Obserwujących
					</span>
					<span>
						<strong>{user.following || 0}</strong> Obserwowanych
					</span>
				</SeparatedContainer>
				{isUserOwner ? (
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
