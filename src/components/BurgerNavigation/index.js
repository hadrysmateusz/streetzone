import React from "react"
import styled from "styled-components/macro"
import FullscreenMenu, { Header } from "../FullscreenMenu"
import { CONST } from "../../constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const MenuNavItem = styled.div`
	user-select: none;
	white-space: nowrap;
	color: var(--gray0);
	font-weight: bold;
	font-size: var(--font-size--m);
	padding: var(--spacing3);
	border-top: 1px solid var(--gray75);
	&:first-of-type {
		border-top: none;
	}
	&:last-child {
		border-bottom: 1px solid var(--gray75);
	}
`

const IconContainer = styled.div`
	padding-left: 0;
	cursor: pointer;
	font-size: 2.15rem;
`

const BurgerNavigation = ({ children }) => {
	return (
		<FullscreenMenu
			renderWhenClosed={(open) => (
				<IconContainer onClick={open}>
					<FontAwesomeIcon icon="bars" />
				</IconContainer>
			)}
			renderWhenOpen={(close) => (
				<>
					<Header>{CONST.BRAND_NAME}</Header>
					{React.Children.map(children, (child, i) =>
						child ? (
							<MenuNavItem key={i} onClick={close}>
								{child}
							</MenuNavItem>
						) : null
					)}
				</>
			)}
		/>
	)
}

export default BurgerNavigation