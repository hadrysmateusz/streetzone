import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { TextBlock } from "../../../components/StyledComponents"
import { GroupContainer } from "../StyledComponents"

const Group = ({ title, hasMore, children, linkTo }) => {
	return (
		<GroupContainer>
			<header>
				{title && (
					<TextBlock bold uppercase size="m">
						{title}
					</TextBlock>
				)}
				{hasMore && (
					<Link to={linkTo}>
						<TextBlock color="gray0">
							Więcej <FontAwesomeIcon size="xs" icon="arrow-right" />
						</TextBlock>
					</Link>
				)}
			</header>
			<div className="content">{children}</div>
		</GroupContainer>
	)
}

export default Group
