import React from "react"
import styled from "styled-components"
import { TextBlock } from "../StyledComponents"

const Container = styled.section`
	border: 1px solid var(--gray100);
	margin-bottom: 20px;
	position: relative;
	background: white;
`

const Header = styled.header`
	padding: 6px 0;
	margin: 0 15px;
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
