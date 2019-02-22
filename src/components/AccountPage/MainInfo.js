import React from "react"
import styled from "styled-components"
import ProfilePicture from "../ProfilePicture"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button, { ButtonContainer } from "../Button"
import UserRating from "./UserRating"

const MainInfoContainer = styled.div`
	display: grid;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: max-content 1fr max-content;
	}

	margin-bottom: 20px;
	padding-bottom: 20px;
	border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};
	gap: 20px;
	overflow: hidden;

	> :first-child {
		margin: 0 auto;
	}

	@media (max-width: ${(p) => p.theme.breakpoints[0] - 1}px) {
		text-align: center;
	}

	.info-field {
		font-size: 0.98rem;
	}

	h2 {
		font-size: 1.45rem;
		font-weight: 500;
		margin: 0;
	}

	h3 {
		font-size: 0.98rem;
		font-weight: 300;
		margin: 7px 0 10px 0;
	}
`

const InfoContainer = styled.div`
	padding-top: 10px;
`

const SeparatedContainer = styled.div`
	display: flex;
	align-items: center;
	--vertical-margin: 10px;
	margin: var(--vertical-margin) calc(var(--vertical-margin) * -1);
	> * {
		padding: 3px 10px;
	}
	> * + * {
		border-left: 1px solid ${(p) => p.theme.colors.gray[75]};
	}
`

const SecondContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`

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
