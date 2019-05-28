import React from "react"
import styled from "styled-components/macro"
import FullscreenMenu from "../FullscreenMenu"

export const MenuNavItem = styled.div`
	user-select: none;
	white-space: nowrap;
	color: var(--gray0);
	font-weight: bold;
	font-size: var(--font-size--m);
	padding: var(--spacing3);
	border-top: 1px solid var(--gray75);
	&:first-child {
		border-top: none;
	}
	&:last-child {
		border-bottom: 1px solid var(--gray75);
	}
`

const BurgerNavigation = ({ children, onClose }) => {
	return (
		<FullscreenMenu>
			{React.Children.map(children, (child, i) =>
				child ? (
					<MenuNavItem key={i} onClick={onClose}>
						{child}
					</MenuNavItem>
				) : null
			)}
		</FullscreenMenu>
	)
}

export default BurgerNavigation
