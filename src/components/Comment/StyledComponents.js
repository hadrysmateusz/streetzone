import styled from "styled-components/macro"

export const CommentContainer = styled.div`
	display: grid;
	gap: var(--spacing1);
	margin-bottom: var(--spacing4);
	/* background: var(--almost-white); */
	padding: 0 var(--spacing3) var(--spacing4);
	/* background: white;
	border: 1px solid var(--gray75); */
	/* box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04); */
	:not(:last-child) {
		border-bottom: 1px solid var(--gray100);
	}
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
	grid-template-columns: 1fr min-content;
	align-items: center;
`
