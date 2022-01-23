import { EmptyStateContainer } from "./EmptyState.styles"

export const EmptyState: React.FC<{ header: string }> = ({ header, children }) => (
  <EmptyStateContainer>
    <div className="header">{header}</div>
    <div className="content">{children}</div>
  </EmptyStateContainer>
)
