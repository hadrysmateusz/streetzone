import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import { overlayTextShadow, getCategoryColor } from "../../../style-utils"
import { route } from "../../../utils"

import { promotedCommon } from "./common"

export const PromotedPostContainer = styled.div`
	background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0) 42%,
			rgba(0, 0, 0, 0.25) 62%,
			rgba(0, 0, 0, 0.8) 100%
		),
		url(${(p) => p.image}), var(--gray100);
	color: white;
	padding: var(--spacing3) 0;
	overflow-y: hidden;
	text-align: center;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover {
			.info-container {
				transform: none;
			}
		}
	}

	.info-container {
		transition: transform 200ms ease;
		transform: translateY(var(--spacing4));
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
	}

	.additional-info {
		margin-top: var(--spacing3);
	}

	.title {
		font-family: var(--font-family--serif);
		font-size: var(--font-size--m);
		font-weight: bold;
		max-width: 75vw;
		padding: var(--spacing2);
	}
	.info {
		border-left: 3px solid ${(p) => getCategoryColor(p.category)};
		padding-left: var(--spacing2);
		line-height: 1.4;
		color: var(--almost-white);
	}

	${overlayTextShadow}
	${promotedCommon}
`

const PromotedPost = ({
	title,
	author,
	category,
	createdAt,
	mainImageIndex,
	imageUrls,
	id
}) => {
	const date = moment(createdAt).format("LL")

	const imageUrl = imageUrls[mainImageIndex]

	return (
		<Link to={route("BLOG_POST", { id })}>
			<PromotedPostContainer image={imageUrl} category={category}>
				<div className="info-container">
					<div className="title">{title}</div>
					<div className="info">{category}</div>
					<div className="additional-info">
						<FontAwesomeIcon icon="user" size="sm" />
						&nbsp;&nbsp;{author}&nbsp;&nbsp;&nbsp;
						<FontAwesomeIcon icon="calendar" size="sm" />
						&nbsp;&nbsp;{date}
					</div>
				</div>
			</PromotedPostContainer>
		</Link>
	)
}

export default PromotedPost
