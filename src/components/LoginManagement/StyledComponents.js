import styled from "styled-components"

export const EnabledIndicator = styled.div`
	height: 28px;
	width: 28px;
	background: white;
	border: 2px solid ${(p) => p.theme.colors.gray[50]};
	border-radius: 2px;
	margin-right: 12px;

	color: ${(p) => p.theme.colors.black[75]};

	display: flex;
	justify-content: center;
	align-items: center;
`

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

export const ConfirmPasswordContainer = styled.div`
	display: flex;
	* + * {
		margin-left: 10px;
	}
`

export const InfoContainer = styled.div`
	position: relative;
	font-size: 0.98rem;
	line-height: 1.4rem;
	color: ${(p) => p.theme.colors.black[50]};
	font-weight: 300;
`

export const InfoIndicator = styled.div`
	position: absolute;
	top: 0px;
	left: -25px;
	font-size: 1.12rem;
	color: ${(p) => p.theme.colors.black[75]};
`

export const LoginManagementContainer = styled.div`
	margin: 35px auto 50px;
	.provider-container {
		margin: 15px 0;
	}
`
