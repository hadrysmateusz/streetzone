import styled from "styled-components"

export const OuterContainer = styled.div`
	display: flex;
	> * {
		flex: 0 0 50%;
		max-width: 50%;
	}
`
export const DetailsContainer = styled.div`
	padding: 0 8px;
`
export const Section = styled.div`
	margin: 10px 0;
	&:not(:last-child) {
		border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};
	}
`
export const InfoItem = styled.div`
	margin: 10px 5px;
	font-size: 0.94rem;
	display: flex;

	h4 {
		flex: 1;
		margin: 0;
		font-weight: 300;
	}
	strike {
		color: ${(p) => p.theme.colors.gray[50]};
	}
`
