import React, { useState, useRef } from "react"
import styled, { keyframes } from "styled-components/macro"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"
import { withBreakpoints } from "react-breakpoints"
import { Portal } from "react-portal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Header from "./Header"
import { CONST } from "../../constants"

const slidein = keyframes`
	from  {
		transform: translateX(100%);

	}
	to {
		transform: translateX(0);
	}
`

export const FullscreenContainer = styled.div`
	width: 100%;
	max-width: 100vw;
	min-width: 0;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100vh;
	background: white;
	animation: ${slidein} 150ms;
`

const IconContainer = styled.div`
	padding-left: 0;
	cursor: pointer;
	font-size: 2.15rem;
`

export const MenuNavItem = styled.div`
	user-select: none;
	white-space: nowrap;
	color: var(--gray0);
	font-weight: bold;
	font-size: var(--font-size--m);
	padding: var(--spacing3);
	border-top: 1px solid var(--gray75);
	&:first-child {
		border-top: none;
	}
	&:last-child {
		border-bottom: 1px solid var(--gray75);
	}
`

const Menu = ({ children, currentBreakpoint }) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef()

	const toggle = () => {
		if (isOpen) {
			enableBodyScroll(menuRef)
		} else {
			disableBodyScroll(menuRef)
		}

		setIsOpen(!isOpen)
	}

	const switchRoute = () => {
		toggle()
		// Force scroll-to-top
		window.scrollTo(0, 0)
	}

	if (currentBreakpoint > 0) {
		clearAllBodyScrollLocks()
	}

	return (
		<>
			<IconContainer onClick={toggle}>
				<FontAwesomeIcon icon="bars" />
			</IconContainer>
			{isOpen && (
				<Portal>
					<FullscreenContainer ref={menuRef}>
						<Header text={CONST.BRAND_NAME} onClose={toggle} />

						<div>
							{React.Children.map(children, (child, i) =>
								child ? (
									<MenuNavItem key={i} onClick={switchRoute}>
										{child}
									</MenuNavItem>
								) : null
							)}
						</div>
					</FullscreenContainer>
				</Portal>
			)}
		</>
	)
}

export default withBreakpoints(Menu)
