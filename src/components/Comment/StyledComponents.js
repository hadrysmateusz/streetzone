import styled from "styled-components/macro"

export const CommentContainer = styled.div`
	margin-bottom: var(--spacing4);
`

export const VerticalSeparator = styled.div`
	height: 100%;
	margin: 0 var(--spacing3);
	width: 0;
	border-left: 1px solid ${(p) => p.theme.colors.gray[75]};
`

export const Header = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
`
