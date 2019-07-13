import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { route } from "../../utils"
import { PageContainer } from "../../components/Containers"

const OuterContainer = styled.div`
	text-align: center;
	margin-top: 23vh;
`

const StatusCode = styled.div`
	font-size: 160px;
	line-height: 1em;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: 300px;
	}
	font-weight: bold;
	color: #f1f1f1;
`

const Message = styled.div`
	color: #e8e8e8;
	font-size: var(--fs-m);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: var(--fs-xl);
	}
	font-weight: bold;
`

const ActionLink = styled(Link)`
	margin-top: var(--spacing3);
	color: var(--black0);
	display: block;
	text-decoration: underline;
	font-weight: var(--semi-bold);
`

const NotFound = () => (
	<PageContainer>
		<OuterContainer>
			<StatusCode>404</StatusCode>
			<Message>Strona której szukasz nie istnieje</Message>
			<ActionLink to={route("HOME")}>Przejdź do strony głównej</ActionLink>
		</OuterContainer>
	</PageContainer>
)

export default NotFound
