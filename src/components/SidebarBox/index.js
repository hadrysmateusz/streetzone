import React from "react"
import styled from "styled-components/macro"
import { TextBlock } from "../StyledComponents"

const Container = styled.section`
	border: 1px solid var(--gray100);
	margin-bottom: var(--spacing3);
	position: relative;
	background: white;
`

const Header = styled.header`
	padding: var(--spacing1) 0;
	margin: 0 var(--spacing3);
	text-align: center;
	border-bottom: 1px solid var(--gray100);
`

const SidebarBox = ({ title, children }) => (
	<Container>
		<Header>
			<TextBlock uppercase bold>
				{title}
			</TextBlock>
		</Header>
		{children}
	</Container>
)

export default SidebarBox
