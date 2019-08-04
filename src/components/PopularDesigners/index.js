import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"
import Ratio from "react-ratio"

import FirebaseImage from "../FirebaseImage"
import { StatelessSearchWrapper } from "../InstantSearchWrapper"
import PageHeading from "../PageHeading"

import { CONST } from "../../constants"
import { route } from "../../utils"
import { encodeURL } from "../../utils/algoliaURLutils"

const OuterContainer = styled.div`
	margin-top: var(--spacing5);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		margin-top: var(--spacing6);
	}
`

const InnerContainer = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	gap: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		gap: var(--spacing3);
	}
`

const DesignerContainer = styled.div`
	border-radius: 50%;
	border: 1px solid var(--gray50);
	overflow: hidden;
	background: white;
	display: flex;
	justify-content: center;
	align-items: center;
`

const ImageContainer = styled.div`
	padding: 18%;
	width: 100%;
	height: 100%;
`

const Designer = (props) => {
	console.log(props)
	return (
		<Link to={encodeURL({ designers: [props.label] }, route("MARKETPLACE"))}>
			<DesignerContainer>
				<ImageContainer>
					<Ratio>
						<FirebaseImage storageRef={props.imageRef} size="M" />
					</Ratio>
				</ImageContainer>
			</DesignerContainer>
		</Link>
	)
}

const PopularDesigners = withBreakpoints(({ currentBreakpoint }) => {
	const limit = +currentBreakpoint < 1 ? 4 : 7

	return (
		<StatelessSearchWrapper
			indexName={CONST.DESIGNERS_ALGOLIA_INDEX}
			limit={limit}
			ignoreArchivedStatus
		>
			{(hits) => (
				<InnerContainer>
					{hits.map((hit) => (
						<Designer {...hit} />
					))}
				</InnerContainer>
			)}
		</StatelessSearchWrapper>
	)
})

export const PopularDesignersHomeSection = () => (
	<OuterContainer>
		<PageHeading>Kupuj popularne marki</PageHeading>
		<PopularDesigners />
	</OuterContainer>
)

export default PopularDesigners
