import { POST_CATEGORIES } from "../../../constants"
import { route } from "../../../utils"

import { CategoryLink, Container } from "./CategoryNav.styles"

const CategoryNav = () => (
  <Container>
    {Object.values(POST_CATEGORIES).map((category) => (
      <CategoryLink key={category} category={category} to={route("BLOG_CATEGORY", { category })}>
        {category}
      </CategoryLink>
    ))}
  </Container>
)

export default CategoryNav
