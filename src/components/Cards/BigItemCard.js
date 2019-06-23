import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import { HeartButton, TYPE } from "../SaveButton"
import { FluidImage } from "../Image"

import { route } from "../../utils"
import { useImage } from "../../hooks"

import {
	Designers,
	Size,
	Price,
	TopContainer,
	MiddleContainer,
	BottomContainer,
	InfoContainer,
	DateContainer,
	cardBorder
} from "./Common"

export const BigContainer = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	background: white;

	a {
		${cardBorder}
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 210px;
		grid-template-rows: 100%;
		height: 240px;
	}
`

const Description = styled.div`
	--line-height: 1.4em;
	color: var(--black25);
	max-width: 80%;
	line-height: var(--line-height);
	height: calc(var(--line-height) * 3);
	overflow: hidden;
	text-overflow: ellipsis;
`

export const Name = styled.div`
	--line-height: 1.5em;

	color: var(--black0);
	font-size: var(--font-size--l);
	font-family: var(--font-family--serif);
	font-weight: bold;
	line-height: var(--line-height);
	max-height: calc(2 * var(--line-height));
	overflow: hidden;
`

export const BigItemCard = ({
	id,
	name,
	designers,
	size,
	price,
	attachments,
	category,
	mainImageIndex,
	description,
	createdAt
}) => {
	const { imageURL } = useImage(attachments[mainImageIndex], "M")
	const date = moment().to(moment(createdAt))

	return (
		<BigContainer>
			<Link to={route("ITEM_DETAILS", { id })}>
				<InfoContainer>
					<TopContainer>
						<div>{category}</div>
						<Designers value={designers} />
						<Size value={size} />
					</TopContainer>
					<MiddleContainer>
						<Name>{name}</Name>
						<DateContainer withMargin>Dodano {date}</DateContainer>
						<Description>{description}</Description>
					</MiddleContainer>
					<BottomContainer pinToBottom>
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
				<FluidImage url={imageURL} />
			</Link>
		</BigContainer>
	)
}
