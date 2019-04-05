import React, { useState, useRef } from "react"
import styled from "styled-components/macro"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"
import { withBreakpoints } from "react-breakpoints"
import { Portal } from "react-portal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PageHeaderContainer } from "../PageHeader/StyledComponents"

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
`

const IconContainer = styled.div`
	padding: var(--spacing3);
	margin-left: calc(0px - var(--spacing3));
	width: 50px;
	cursor: pointer;
`

export const MenuNavItem = styled.div`
	user-select: none;
	white-space: nowrap;
	color: var(--gray0);
	font-weight: bold;
	font-size: var(--font-size--m);
	padding: var(--spacing3);
	border-top: 1px solid var(--gray75);
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
		<div>
			<IconContainer onClick={toggle}>
				<FontAwesomeIcon icon="bars" size="lg" />
			</IconContainer>
			{isOpen && (
				<Portal>
					<FullscreenContainer ref={menuRef}>
						<PageHeaderContainer>
							<IconContainer onClick={toggle}>
								<FontAwesomeIcon icon="times" size="lg" />
							</IconContainer>
						</PageHeaderContainer>

						<div>
							{React.Children.map(children, (child) =>
								child ? <MenuNavItem onClick={switchRoute}>{child}</MenuNavItem> : null
							)}
						</div>
					</FullscreenContainer>
				</Portal>
			)}
		</div>
	)
}

export default withBreakpoints(Menu)
