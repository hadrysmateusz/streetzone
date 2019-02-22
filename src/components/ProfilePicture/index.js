import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProfilePictureContainer = styled.div`
	display: ${(p) => (p.inline ? "inline-block" : "block")};
	position: relative;
	overflow: hidden;
	border-radius: 50%;

	width: ${(p) => p.size};
	height: ${(p) => p.size};
	min-width: ${(p) => p.size};
	min-height: ${(p) => p.size};
	max-width: ${(p) => p.size};
	max-height: ${(p) => p.size};
	flex: 0 0 ${(p) => p.size};
`

const ImageContainer = styled.div`
	height: 100%;
	position: relative;
	z-index: 70;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-image: ${(p) => `url(${p.url})`};
`

const PlaceholderIcon = styled(FontAwesomeIcon)`
	height: 100%;
	position: absolute;
	z-index: 60;
	top: 0;
	left: 0;
	color: ${(p) => p.theme.colors.gray[75]};
`

const ProfilePicture = ({ url, size = "100%", inline, ...rest }) => (
	<ProfilePictureContainer size={size} inline={inline} {...rest}>
		<ImageContainer url={url} />
		<PlaceholderIcon icon="user-circle" style={{ width: size }} />
	</ProfilePictureContainer>
)

export default ProfilePicture
