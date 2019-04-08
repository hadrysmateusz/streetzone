import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import { TextBlock } from "../../../components/StyledComponents"

import { PromotedPostContainer } from "../StyledComponents"

import { ROUTES } from "../../../constants"

const PromotedPost = ({ title, author, createdAt, mainImageURL, id }) => {
	return (
		<Link to={ROUTES.BLOG_POST.replace(":id", id)}>
			<PromotedPostContainer image={mainImageURL}>
				<TextBlock serif size="l">
					{title}
				</TextBlock>
				<TextBlock serif>
					{author && author + " - "}
					{moment(createdAt).format("D.M.YY")}
				</TextBlock>
			</PromotedPostContainer>
		</Link>
	)
}

export default PromotedPost
