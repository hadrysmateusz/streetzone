import { PageHeadingContainer } from "./PageHeading.styles"

// TODO: make the emoji properly accessible
export const PageHeading: React.FC<{
  emoji?: string
  ariaLabel?: React.AriaAttributes["aria-label"]
}> = ({ emoji, children, ariaLabel = "" }) => (
  <PageHeadingContainer>
    {emoji ? (
      <span role="img" aria-label={ariaLabel}>
        {emoji}
      </span>
    ) : null}
    <span>
      &nbsp;
      {children}
    </span>
  </PageHeadingContainer>
)

export default PageHeading
