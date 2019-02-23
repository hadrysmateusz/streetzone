import styled from "styled-components"

export const CommentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 40px;

	.info-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		height: 46px;
		padding: 10px 0;
		border-top: 1px solid ${(p) => p.theme.colors.gray[75]};
		border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};
		margin-bottom: 20px;
	}

	.info-bar-inner-container {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}

	.buttons-container {
		display: flex;
		position: absolute;
		right: 0;
		top: 0;
		padding: 10px;
	}
`

export const VerticalSeparator = styled.div`
	height: 100%;
	margin: 0 15px;
	width: 0;
	border-left: 1px solid ${(p) => p.theme.colors.gray[75]};
`
