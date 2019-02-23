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

const MainInfo = ({ user, userIsOwner }) => (
	<MainInfoContainer>
		<div>
			<ProfilePicture url={getProfilePictureURL(user, "M")} size="170px" />
		</div>
		<InfoContainer>
			<h2>{user.name}</h2>

			<h3>
				<div>{user.email}</div>
			</h3>

			<SeparatedContainer>
				<UserRating feedback={user.feedback} />
				<span>
					Ilość komentarzy: <strong>{user.feedback ? user.feedback.length : 0} </strong>
				</span>
			</SeparatedContainer>

			<div className="info-field">
				<span>W serwisie od: </span>
				<strong>{moment(user.userSince).format("D.MM.YYYY")}</strong>
			</div>

			{user.city && (
				<div className="info-field">
					<span>Miasto: </span>
					<strong>{user.city}</strong>
				</div>
			)}
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
			{userIsOwner ? (
				<ButtonContainer alignRight>
					<Button>
						<span>Edytuj Profil</span>
					</Button>
					<Button>
						<FontAwesomeIcon icon="ellipsis-h" size="lg" />
					</Button>
				</ButtonContainer>
			) : (
				<ButtonContainer alignRight>
					<Button primary>
						<FontAwesomeIcon icon={["far", "envelope"]} size="lg" />
						<span>Wyślij wiadomość</span>
					</Button>
					<Button>
						<FontAwesomeIcon icon={["far", "heart"]} size="lg" />
					</Button>
					<Button>
						<FontAwesomeIcon icon="ellipsis-h" size="lg" />
					</Button>
				</ButtonContainer>
			)}
		</SecondContainer>
	</MainInfoContainer>
)

export default MainInfo
