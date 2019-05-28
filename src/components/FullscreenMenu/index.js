import React, { useState, useRef, useEffect, useContext } from "react"
import styled, { keyframes, css } from "styled-components/macro"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"
import { Portal } from "react-portal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { TextBlock } from "../StyledComponents"

const FullscreenMenuContext = React.createContext()

const HeaderContainer = styled.header`
	border-bottom: 1px solid var(--gray75);
	height: var(--page-header-height);
	padding: 0 var(--spacing3);
	display: grid;
	grid-template-columns: 1fr min-content;
	grid-auto-flow: column;
	align-items: center;
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
	${(p) => p.animate && animate(p.animationKeyframes, p.animationTime)}
`

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

	const toggle = () => {
		setIsOpen((isOpen) => !isOpen)
	}

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
			disableBodyScroll(menuRef)
		} else {
			enableBodyScroll(menuRef)
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
