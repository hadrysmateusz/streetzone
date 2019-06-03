import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"

import { HeartButton, TYPE } from "../SaveButton"

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
	FluidImage
} from "./Common"

export const SmallContainer = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	max-width: 300px;
	width: 100%;

	a {
		border: 1px solid var(--gray75);
		overflow: hidden;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 140px min-content;
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-rows: 200px min-content;
		}
	}
`

export const SmallItemCard = ({
	id,
	name,
	designers,
	size,
	price,
	attachments,
	mainImageIndex
}) => {
	const { imageURL } = useImage(attachments[mainImageIndex], "M")

	return (
		<SmallContainer>
			<Link to={route("ITEM_DETAILS", { id })}>
				{imageURL && <FluidImage url={imageURL} />}
				<InfoContainer>
					<TopContainer>
						{/* <div>{itemCategory}</div> */}
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
	)
}
