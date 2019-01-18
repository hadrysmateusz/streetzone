import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProfilePictureContainer = styled.div`
	display: ${(p) => (p.inline ? "inline-block" : "block")};
	width: ${(p) => p.size};
	height: ${(p) => p.size};
	position: relative;
	overflow: hidden;
	border-radius: 50%;
`

const ImageContainer = styled.div`
	height: 100%;
	position: relative;
	z-index: 800;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-image: ${(p) => `url(${p.url})`};
`

const PlaceholderIcon = styled(FontAwesomeIcon)`
	height: 100%;
	position: absolute;
	z-index: 700;
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
