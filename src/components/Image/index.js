import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const FluidImage = styled.div`
	width: 100%;
	height: 100%;
	background-image: url("${(p) => p.url}");
	background-size: ${(p) => (p.contain ? "contain" : "cover")};
	background-repeat: no-repeat;
	background-position: center;
`

export const Image = styled.div`
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	background-image: url("${(p) => p.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`

export const ErrorIcon = styled(FontAwesomeIcon).attrs({ icon: "image" })`
	font-size: 5rem;
	path {
		color: ${(p) => p.theme.colors.gray[100]};
	}
`
