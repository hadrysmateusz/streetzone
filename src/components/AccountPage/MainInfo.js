import React from "react"
import styled from "styled-components"
import ProfilePicture from "../ProfilePicture"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MainInfoContainer = styled.div`
	grid-area: info;
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 110px auto max-content;
	@media(min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 120px 1fr max-content;
		grid-template-rows: 120px;
	}
	background: white;
	gap: 20px;
	padding: 20px;
	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	overflow: hidden;

	> :first-child {
		margin: 0 auto;
	}

	@media(max-width: ${(p) => p.theme.breakpoints[0] - 1}px) {
		text-align: center;
	}

	.info-container {
		> div {
			display: grid;
			gap: 4px 8px;
			@media(min-width: ${(p) => p.theme.breakpoints[0]}px) {
				grid-template-columns: max-content max-content;
			}
		}
	}

	.info-header {
		text-transform: uppercase;
		font-size: 0.9rem;
		color: #3a3a3a;
		font-weight: 500;
		padding-right: 8px;
	}

	.icons-container {
		display: flex;
		justify-content: center;
		align-items: center;
		> div {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px 20px;
			background: ${(p) => p.theme.colors.black[25]};
			color: white;
			text-transform: uppercase;
			font-size: 0.8rem;
			font-weight: 500;
			/* border: 1px solid ${(p) => p.theme.colors.gray[75]}; */
		}
		svg {
			font-size: 1.3rem;
			margin-right: 8px;
		}
	}

	h2 {
		font-size: 1.3rem;
		margin: 5px 0 10px;
	}
`

const MainInfo = ({ user }) => (
	<MainInfoContainer>
		<div>
			<ProfilePicture url={getProfilePictureURL(user, "M")} size="110px" />
		</div>
		<div className="info-container">
			<h2>{user.name}</h2>

			<div>
				<div className="info-header">Email:</div>
				<div>{user.email}</div>
				{user.city && (
					<>
						<div className="info-header">Miejscowość:</div>
						<div>{user.city}</div>
					</>
				)}
				<div className="info-header">W serwisie od:</div>
				<div>{moment(user.userSince).format("D.MM.YYYY")}</div>
			</div>
		</div>
		<div className="icons-container">
			<div>
				<FontAwesomeIcon icon={["far", "envelope"]} /> Wyślij wiadomość
			</div>
		</div>
	</MainInfoContainer>
)

export default MainInfo
