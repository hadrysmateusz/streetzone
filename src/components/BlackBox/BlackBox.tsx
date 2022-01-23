import { Header, Container } from "./BlackBox.styles"

const BlackBox: React.FC<{ header?: string }> = ({ header, children }) => (
  <Container>
    {header && <Header>{header}</Header>}
    <div>{children}</div>
  </Container>
)

export default BlackBox
