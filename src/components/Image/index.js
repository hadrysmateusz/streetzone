import styled from "styled-components/macro"

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
