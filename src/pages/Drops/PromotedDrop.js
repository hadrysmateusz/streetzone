import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import PropTypes from "prop-types"
import styled from "styled-components/macro"

import { route } from "../../utils"

export const PromotedDropContainer = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${(p) => p.image});
	background-color: var(--almost-white);
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	color: var(--black75);
	border: 1px solid var(--gray75);
	transition: border-color 200ms ease;
	:hover {
		border: 1px solid var(--gray25);
	}

	.bottom-container {
		border-top: 1px solid var(--gray75);
		background: rgba(255, 255, 255, 0.8);
		margin: 0;
		height: 140px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		padding: var(--spacing2) 0;
	}

	.name {
		font-family: var(--font-family--serif);
		max-width: 90%;
		font-weight: bold;
		text-align: center;
		margin: 0 auto;
		padding-bottom: var(--spacing1);
		font-size: var(--font-size--m);
		@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
			font-size: var(--font-size--l);
			padding-bottom: var(--spacing2);
		}
	}

	.details {
		font-style: italic;
		color: var(--gray0);
	}
`

const PromotedPost = ({
	id,
	mainImageIndex,
	imageUrls,
	name,
	dropsAtApproxTimestamp
}) => {
	const date = moment().to(moment(dropsAtApproxTimestamp))
	const imageUrl = imageUrls[mainImageIndex]

	return (
		<Link to={route("DROP_DETAILS", { id })}>
			<PromotedDropContainer image={imageUrl}>
				<div className="bottom-container">
					<div className="name">{name}</div>
					{date && <div className="details">{date}</div>}
				</div>
			</PromotedDropContainer>
		</Link>
	)
}

PromotedPost.propTypes = {
	id: PropTypes.string.isRequired,
	mainImageIndex: PropTypes.number.isRequired,
	imageUrls: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	dropsAtApproxTimestamp: PropTypes.number.isRequired
}

export default PromotedPost