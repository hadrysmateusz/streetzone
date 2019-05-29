import React, { useState, useRef, useEffect, useContext } from "react"
import styled, { keyframes, css } from "styled-components/macro"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"
import { Portal } from "react-portal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import Div100vh from "react-div-100vh"
import Div100vh from "../Div100vh"

import { TextBlock } from "../StyledComponents"

const FullscreenMenuContext = React.createContext()

const DEFAULT_ANIMATION_TIME = "150ms"
const DEFAULT_ANIMATION = keyframes`
	from  {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
`

const animate = (
	animationKeyframes = DEFAULT_ANIMATION,
	animationTime = DEFAULT_ANIMATION_TIME
) => css`
	animation: ${animationKeyframes} ${animationTime};
`

export const FullscreenContainer = styled(Div100vh)`
	width: 100%;
	min-width: 0;
	position: fixed;
	padding-top: var(--page-header-height);
	top: 0;
	left: 0;
	background: white;
	overflow: scroll;
	> * {
		overflow: hidden;
	}

	${(p) => p.animate && animate(p.animationKeyframes, p.animationTime)}
`

const HeaderContainer = styled.header`
	background: white;
	border-bottom: 1px solid var(--gray75);
	height: var(--page-header-height);
	padding: 0 var(--spacing3);
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-auto-flow: column;
	align-items: center;

	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
`

const CloseIconContainer = styled.span`
	cursor: pointer;
	padding: var(--spacing1);
`

export const Header = ({ children }) => {
	const isCustomContent = typeof children !== "string"
	const { close } = useContext(FullscreenMenuContext)

	return (
		<HeaderContainer>
			{isCustomContent ? (
				<div>{children}</div>
			) : (
				<TextBlock size="m" bold>
					{children}
				</TextBlock>
			)}
			<CloseIconContainer onClick={close}>
				<FontAwesomeIcon icon="times" />
			</CloseIconContainer>
		</HeaderContainer>
	)
}

const Menu = ({
	onClose,
	onOpen,
	renderWhenClosed,
	renderWhenOpen,
	animate = true,
	startOpen = false
}) => {
	const [isOpen, setIsOpen] = useState(startOpen)
	const menuRef = useRef()

	const close = () => {
		setIsOpen(false)
		if (onClose) onClose()
	}

	const open = () => {
		setIsOpen(true)
		if (onOpen) onOpen()
	}

	useEffect(() => {
		if (isOpen) {
			disableBodyScroll(menuRef.current)
		} else {
			enableBodyScroll(menuRef.current)
		}

		return clearAllBodyScrollLocks
	})

	return (
		<FullscreenMenuContext.Provider value={{ close }}>
			{isOpen ? (
				<Portal>
					<FullscreenContainer ref={menuRef} animate={animate}>
						{renderWhenOpen ? renderWhenOpen(close) : null}
					</FullscreenContainer>
				</Portal>
			) : renderWhenClosed ? (
				renderWhenClosed(open)
			) : (
				<button onClick={open}>Otwórz</button>
			)}
		</FullscreenMenuContext.Provider>
	)
}

export default Menu
