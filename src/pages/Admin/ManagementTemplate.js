import React from "react"
import styled from "styled-components/macro"

import LoadingSpinner from "../../components/LoadingSpinner"
import { ButtonContainer, LinkButton } from "../../components/Button"
import { TextBlock } from "../../components/StyledComponents"
import { PageContainer } from "../../components/Containers"

import { useLiveCollection } from "../../hooks"
import { route } from "../../utils"

export const List = styled.div`
	display: grid;
	gap: var(--spacing2);
	grid-template-columns: 1fr 1fr;

	> * {
		overflow: hidden;
	}
`

const ManagementTemplate = ({
	firestoreCollection,
	addRouteName,
	addRouteText,
	heading,
	PreviewComponent,
	children
}) => {
	const { results, isEmpty, isLoading } = useLiveCollection(firestoreCollection)

	return isLoading ? (
		<LoadingSpinner fixedHeight />
	) : (
		<PageContainer>
			<TextBlock size="xl" bold>
				{heading}
			</TextBlock>

			<div>{children}</div>

			<ButtonContainer>
				<LinkButton primary big fullWidth to={route(addRouteName)}>
					{addRouteText}
				</LinkButton>
			</ButtonContainer>

			<List>{!isEmpty && results.map((hit) => <PreviewComponent {...hit} />)}</List>
		</PageContainer>
	)
}

export default ManagementTemplate
