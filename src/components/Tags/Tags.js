import { Link } from "react-router-dom"

import { route } from "../../utils"
import { TagContainer, TagsContainer } from "./Tags.styles"

export const Tag = ({ tag }) => (
  <TagContainer as={Link} to={route("BLOG_TAG", null, { tag })}>
    {tag}
  </TagContainer>
)

export const Tags = ({ tags }) =>
  tags ? (
    <TagsContainer>
      {tags.map((tag) => (
        <Tag tag={tag} key={tag} />
      ))}
    </TagsContainer>
  ) : null

export default Tags
