import React, { useState } from "react"
import styled from "styled-components/macro"

import { IconButton } from "../Button"
import Overlay from "../Overlay"

const Submenu = styled.div`
	background: white;
	white-space: nowrap;
	border: 1px solid var(--gray75);
	display: grid;
	padding: var(--spacing2) 0;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);

	> * {
		padding: var(--spacing2) 0;
		width: 100%;
	}
`

const SubmenuContainer = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	min-width: 100%;
	z-index: 996;
	padding-top: var(--spacing3);
`

const OuterContainer = styled.div`
	position: relative;
`

const MoreButton = ({ children, icon = "ellipsis-h", title = "Więcej" }) => {
	const [isOpen, setIsOpen] = useState(false)
	const onClick = () => {
		setIsOpen((state) => !state)
	}

	return (
		<OuterContainer>
			<IconButton icon={icon} title={title} onClick={onClick} />
			{isOpen && (
				<>
					<SubmenuContainer>
						<Submenu>{children}</Submenu>
					</SubmenuContainer>
					<Overlay onClick={onClick} />
				</>
			)}
		</OuterContainer>
	)
}

export default MoreButton
