import React, { useState, useRef, useEffect } from "react"
import styled, { keyframes, css } from "styled-components/macro"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"
import { withBreakpoints } from "react-breakpoints"
import { Portal } from "react-portal"

import Header from "./Header"

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
	title,
	onClose,
	onOpen,
	renderWhenClosed,
	renderWhenOpen,
	currentBreakpoint,
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
		<>
			{isOpen ? (
				<Portal>
					<FullscreenContainer ref={menuRef} animate={animate}>
						<Header text={title} onClose={close} />
						<div>{renderWhenOpen ? renderWhenOpen(close) : null}</div>
					</FullscreenContainer>
				</Portal>
			) : renderWhenClosed ? (
				renderWhenClosed(open)
			) : (
				<button onClick={open}>Otwórz</button>
			)}
		</>
	)
}

export default withBreakpoints(Menu)
