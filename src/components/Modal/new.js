import React, { useState } from "react"
import { Portal } from "react-portal"
import styled from "styled-components/macro"

import { useBodyScrollLock } from "../../hooks"

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.3);
	z-index: 1000;
`

const ModalBox = styled.div`
	box-sizing: content-box;
	background: red;
	padding: var(--spacing4);
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.45);
	min-width: 250px;
	max-width: 90vw;
	z-index: 1001;
	position: relative;
`

export const StatefulModal = ({ children }) => {
	const [isOpen, setIsOpen] = useState()

	const open = () => {
		setIsOpen(true)
	}

	const close = () => {
		setIsOpen(false)
	}

	const wrapWithModal = (children) => {
		if (!isOpen) return null

		return (
			<Modal onRequestClose={close} isOpen>
				{children}
			</Modal>
		)
	}

	return (
		<div
			onClick={(e) => {
				// prevent click events on the trigger from propagating to the rest of the React tree
				e.stopPropagation()
				e.preventDefault()
			}}
		>
			{children({ open, close, isOpen, modal: wrapWithModal })}
		</div>
	)
}

export const Modal = ({ children, onRequestClose }) => {
	const scrollableRef = useBodyScrollLock(true)

	const closeOnEsc = (e) => {
		if (e.key === "Escape") {
			onRequestClose()
		}
	}

	return (
		<Portal>
			<ModalContainer
				ref={scrollableRef}
				onKeyDown={closeOnEsc}
				onClick={(e) => {
					// prevent click events on the trigger from propagating to the rest of the React tree
					e.stopPropagation()
					e.preventDefault()
					// call the on request close handler
					onRequestClose()
				}}
			>
				<ModalBox
					onClick={(e) => {
						// prevent click events in the modal from accidentaly closing it
						e.stopPropagation()
					}}
				>
					{children}
				</ModalBox>
			</ModalContainer>
		</Portal>
	)
}

export default Modal
