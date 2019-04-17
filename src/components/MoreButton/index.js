import React, { useState } from "react"
import styled from "styled-components"

import { IconButton } from "../Button"
import { Submenu } from "../Basics"
import Overlay from "../Overlay"

const SubmenuContainer = styled.div`
	position: absolute;
	top: 100%;
	min-width: 100%;

	${(p) => `${p.align}: 0;`}
	z-index: 996;

	padding-top: var(--spacing3);
`

const OuterContainer = styled.div`
	position: relative;
`

const MoreButton = ({ children, icon = "ellipsis-h", title = "Więcej" }) => {
	const [isOpen, setIsOpen] = useState(false)
	const onClick = () => {
		setIsOpen(!isOpen)
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
