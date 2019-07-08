import React from "react"
import styled from "styled-components/macro"

const Container = styled.div`
	background: var(--black25);
	color: var(--gray100);
	padding: var(--spacing3);
	margin-bottom: var(--spacing3);
`

const Header = styled.div`
	text-transform: upperCase;
	color: white;
	font-weight: bold;
	margin-bottom: 4px;
`

const Content = styled.div``

const BlackBox = ({ header, children }) => (
	<Container>
		<Header>{header}</Header>
		<Content>{children}</Content>
	</Container>
)

export default BlackBox
