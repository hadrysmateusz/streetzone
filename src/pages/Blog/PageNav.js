import React from "react"
import { withRouter, Link } from "react-router-dom"
import { ROUTES } from "../../constants"
import styled from "styled-components"

const NavContainer = styled.div`
	margin: var(--spacing3) 0;
	text-transform: uppercase;
	font-size: var(--font-size--xs);
	color: var(--gray0);
`

const IconContainer = styled.div`
	margin: 0 var(--spacing2);

	font-weight: bold;
	display: inline;
`

const PageNav = ({ match }) => {
	const section = match.params.section ? match.params.section : "Wszystko"
	const tag = match.params.tag ? match.params.tag : null

	return (
		<NavContainer>
			<Link to={ROUTES.BLOG_HOME}>Czytaj</Link>
			{section && (
				<Link to={ROUTES.BLOG_SECTION.replace(":section", section).replace(":tag", tag)}>
					<IconContainer>&gt;</IconContainer>
					{section}
				</Link>
			)}
			{tag && (
				<Link to={ROUTES.BLOG_TAG.replace(":section", section).replace(":tag", tag)}>
					<IconContainer>&gt;</IconContainer>
					{tag}
				</Link>
			)}
		</NavContainer>
	)
}

export default withRouter(PageNav)