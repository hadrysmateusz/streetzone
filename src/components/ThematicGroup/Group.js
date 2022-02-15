import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { TextBlock } from "../StyledComponents"

import { GroupContainer } from "./Group.styles"

const Group = ({ title, hasMore = false, children, linkTo }) => (
  <GroupContainer>
    <Link to={linkTo}>
      <header>
        {title && (
          <TextBlock bold uppercase size="m">
            {title}
          </TextBlock>
        )}
        {hasMore && (
          <TextBlock color="gray0">
            Więcej <FontAwesomeIcon size="xs" icon="arrow-right" />
          </TextBlock>
        )}
      </header>
    </Link>
    <div className="content">{children}</div>
  </GroupContainer>
)

export default Group
