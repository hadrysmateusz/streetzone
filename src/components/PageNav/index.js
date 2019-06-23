import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"

import { route } from "../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const NavContainer = styled.div`
	margin: ${(p) => (p.noMargin ? "0" : "var(--spacing3)")} 0;
	text-transform: uppercase;
	font-size: var(--font-size--xs);
	color: ${(p) => (p.white ? "white" : "var(--gray0)")};
	width: 100%;
	display: grid;
	grid-template-columns: 1fr auto;
	.left {
		text-align: left;
		min-width: 0;
	}
	.right {
		font-weight: bold;
		> :first-child {
			margin-right: var(--spacing1);
		}
	}
`

const IconContainer = styled.div`
	margin: 0 var(--spacing2);

	font-weight: bold;
	display: inline;
`

const Chevron = () => <IconContainer>&gt;</IconContainer>

const PageNav = ({ breadcrumbs, showBack = true, white, noMargin }) => {
	const routes = breadcrumbs.map((value) => {
		// Use the first element of the array as the title
		const title = value.shift()

		// Use the rest to construct the path
		const path = route(...value)

		return { title, path }
	})

	const lastRoute = routes[routes.length - 1]

	return (
		<NavContainer white={white} noMargin={noMargin}>
			<div className="left">
				{routes.map(({ title, path }, i) => (
					<Link to={path} key={title}>
						{i > 0 && <Chevron />}
						{title}
					</Link>
				))}
			</div>
			{showBack && (
				<div className="right">
					<FontAwesomeIcon icon="arrow-left" />
					<Link to={lastRoute.path}>Wróć</Link>
				</div>
			)}
		</NavContainer>
	)
}

export default PageNav
