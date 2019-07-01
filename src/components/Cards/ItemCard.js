import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"

import { HeartButton, TYPE } from "../SaveButton"
import { FluidImage } from "../Image"

import { route } from "../../utils"
import { useImage } from "../../hooks"

import {
	Name,
	Designers,
	Size,
	Price,
	TopContainer,
	MiddleContainer,
	BottomContainer,
	InfoContainer,
	cardBorder
} from "./Common"

export const SmallContainer = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	max-width: 300px;
	width: 100%;
	background: white;

	a {
		${cardBorder}
		overflow: hidden;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 140px min-content;
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-rows: 165px min-content;
		}
	}
`

const SmallItemCardDumb = memo(({ id, name, designers, size, price, imageUrl }) => (
	<SmallContainer>
		<Link to={route("ITEM_DETAILS", { id })}>
			<FluidImage url={imageUrl} />
			<InfoContainer>
				<TopContainer>
					<Designers value={designers} />
					<Size value={size} />
				</TopContainer>
				<MiddleContainer>
					<Name>{name}</Name>
				</MiddleContainer>
				<BottomContainer>
					<Price value={price} />
					<div className="align-right">
						<HeartButton
							css={`
								color: var(--gray25);
								padding-right: 0;
							`}
							id={id}
							type={TYPE.ITEM}
							scale={1.5}
						/>
					</div>
				</BottomContainer>
			</InfoContainer>
		</Link>
	</SmallContainer>
))

export const SmallItemCard = ({ attachments, mainImageIndex, ...rest }) => {
	const { imageURL } = useImage(attachments[mainImageIndex], "M")
	return <SmallItemCardDumb imageUrl={imageURL} {...rest} />
}
