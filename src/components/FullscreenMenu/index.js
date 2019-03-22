import React, { useState, useRef } from "react"
import styled from "styled-components"
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

const ContentContainer = styled.div`
	/* padding: 0 var(--spacing3); */
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
			<FontAwesomeIcon icon="bars" size="lg" onClick={toggle} />
			{isOpen && (
				<Portal>
					<FullscreenContainer ref={menuRef}>
						<PageHeaderContainer>
							<FontAwesomeIcon icon="times" onClick={toggle} size="lg" />
						</PageHeaderContainer>

						<ContentContainer>
							{React.Children.map(children, (child) =>
								child ? <MenuNavItem onClick={switchRoute}>{child}</MenuNavItem> : null
							)}
						</ContentContainer>
					</FullscreenContainer>
				</Portal>
			)}
		</div>
	)
}

export default withBreakpoints(Menu)
