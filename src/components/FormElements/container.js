import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const InfoContainer = styled.div`
	font-size: var(--font-size--xs);
	color: ${(p) => (p.hasError ? "var(--error50)" : "var(--gray0)")};
	display: flex;
	align-items: center;
	margin-top: var(--spacing1);
`

const FormElementContainer = ({ info, error, children }) => {
	return (
		<div>
			{children}
			<InfoContainer hasError={!!error}>
				{error ? (
					<>
						<FontAwesomeIcon icon={faExclamationCircle} />
						<span>{error}</span>
					</>
				) : (
					info && <span>{info}</span>
				)}
			</InfoContainer>
		</div>
	)
}

export default FormElementContainer