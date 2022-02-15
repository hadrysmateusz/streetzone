import { TextBlock } from "../StyledComponents"

export const Heading = ({ children }) => (
  <TextBlock size="m" bold uppercase>
    {children}
  </TextBlock>
)
