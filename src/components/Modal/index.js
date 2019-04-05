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
`

const ModalBox = styled.div`
	box-sizing: content-box;
	width: 280px;
	background: white;
	padding: 30px;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.45);
`

const Modal = ({ isOpen, children, onRequestClose }) => {
	return isOpen ? (
		<Portal>
			<ModalContainer onClick={onRequestClose}>
				<ModalBox onClick={(e) => e.stopPropagation()}>{children}</ModalBox>
			</ModalContainer>
		</Portal>
	) : null
}

export default Modal
