import styled from "styled-components"

export const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
`

export const SocialContainer = styled.div`
	display: grid;
	gap: 15px;
`

export const PasswordContainer = styled.div`
	form {
		display: grid;
		gap: 15px;
	}
`

export const InfoContainer = styled.div`
	position: relative;
	line-height: 1.4rem;
	color: ${(p) => p.theme.colors.black[50]};
	font-weight: 300;
`

export const InfoIndicator = styled.div`
	position: absolute;
	top: 0px;
	left: -25px;
	color: ${(p) => p.theme.colors.black[75]};
`

export const LoginManagementContainer = styled.div`
	margin: var(--spacing3) auto;
	.provider-container {
		margin: var(--spacing3) 0;
	}
`
