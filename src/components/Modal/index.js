import React from "react"
import { Portal } from "react-portal"
import styled from "styled-components/macro"

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

const Modal = ({ isOpen = true, children, onRequestClose, render }) => {
	return isOpen ? (
		<Portal>
			<ModalContainer
				onClick={(e) => {
					// prevent click events on the overlay from propagating to the rest of the React tree
					e.stopPropagation()
					// trigger request close handler
					onRequestClose()
				}}
			>
				<ModalBox
					onClick={(e) => {
						// prevent click events in the modal from accidentaly closing it
						e.stopPropagation()
					}}
					onKeyDown={(e) => {
						console.log(e)
						if (e.key === "Escape") {
							e.stopPropagation()
							onRequestClose()
						}
					}}
				>
					{render ? render() : children}
				</ModalBox>
			</ModalContainer>
		</Portal>
	) : null
}

export default Modal
