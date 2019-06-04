import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import { FluidImage } from "../Image"

import { route } from "../../utils"

import {
	Name,
	PostCategory,
	DateContainer,
	MiddleContainer,
	BottomContainer,
	InfoContainer
} from "./Common"

export const Container = styled.div`
	min-width: 0; /* this has to be on the outermost component*/
	width: 100%;
	max-width: 310px;

	a {
		border: 1px solid var(--gray75);
		overflow: hidden;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 140px min-content;
		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-rows: 175px min-content;
		}
	}
`

export const PostCard = ({
	id,
	title,
	category,
	imageUrls,
	mainImageIndex,
	createdAt
}) => {
	const imageURL = imageUrls[mainImageIndex]
	const date = moment(createdAt).format("LL")

	return (
		<Container>
			<Link to={route("BLOG_POST", { id })}>
				<FluidImage url={imageURL} />
				<InfoContainer>
					<MiddleContainer>
						<Name>{title}</Name>
					</MiddleContainer>
					<BottomContainer>
						<PostCategory category={category}>{category}</PostCategory>
						<DateContainer>&nbsp;&nbsp;/&nbsp;&nbsp;{date}</DateContainer>
					</BottomContainer>
				</InfoContainer>
			</Link>
		</Container>
	)
}
