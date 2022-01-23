import { PageHeadingContainer } from "./PageHeading.styles"

// TODO: make the emoji properly accessible
const PageHeading = ({ emoji, children, ariaLabel = "" }) => (
  <PageHeadingContainer>
    <span role="img" aria-label={ariaLabel}>
      {emoji}
    </span>
    <span>
      &nbsp;
      {children}
    </span>
  </PageHeadingContainer>
)

export default PageHeading
