import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useScrollPosition } from "../../hooks"
import { scaleInCenterAnimation } from "../../style-utils/animations"

const ScrollToTopButton = styled.button`
	--size: 60px;
	--offset: 15px;
	--font-size: 1.1rem;
	${scaleInCenterAnimation}
	background: var(--black0);
	color: white;
	outline: none;
	box-shadow: none;
	border: none;
	border-radius: 50%;
	cursor: pointer;
	transition: background-color 200ms ease;
	:hover {
		background: var(--black50);
	}
	position: sticky;
	float: right;
	font-size: var(--font-size);
	bottom: var(--offset);
	right: var(--offset);
	/* 
	make the elements above ignore the height and offset of the button 
	the additional 20px is to make the size of the last item visible
	*/
	margin-top: calc((var(--size) + var(--offset)) * -1);
	width: var(--size);
	height: var(--size);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		--offset: 30px;
		--font-size: 1.5rem;
	}
`

const ScrollToTop = () => {
	const scrollPosition = useScrollPosition()

	const shouldShow = scrollPosition >= window.innerHeight / 2

	const onClick = () =>
		document
			.getElementById("App-Element")
			.scrollIntoView({ behavior: "smooth", block: "start" })

	return shouldShow ? (
		<ScrollToTopButton onClick={onClick}>
			<FontAwesomeIcon icon="long-arrow-alt-up" />
		</ScrollToTopButton>
	) : null
}

export default ScrollToTop
