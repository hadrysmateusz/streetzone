import React from "react"
import styled from "styled-components"
import { Header4 } from "../StyledComponents"

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
			<Header4 uppercase bold>
				{title}
			</Header4>
		</Header>
		{children}
	</Container>
)

export default SidebarBox
