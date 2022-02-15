import { NavLink } from "react-router-dom"
import { compose } from "recompose"
import { connectRefinementList } from "react-instantsearch-dom"

import route from "../../utils/route"
import { withProps } from "../../HOCs"

import { Container, Tag } from "./PopularTags.styles"

const PopularTags = ({ items }) => (
  <Container>
    {items.map((item) => {
      let to = route("BLOG_TAG", null, { tag: item.value })

      return (
        <NavLink to={to} key={item.value}>
          <Tag> {item.label}</Tag>
        </NavLink>
      )
    })}
  </Container>
)

export default compose(withProps({ attribute: "tags" }), connectRefinementList)(PopularTags)
