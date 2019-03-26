import React from "react"
import styled from "styled-components"

const ErrorContainer = styled.div`
	border: 1px solid var(--error50);
	background: var(--error0);
	color: var(--black25);
	padding: var(--spacing2);
`

const FormError = ({ error }) => (error ? <ErrorContainer>{error}</ErrorContainer> : null)

export default FormError
