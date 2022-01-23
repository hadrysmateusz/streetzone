import { TextBlock, SmallTextBlock } from "../StyledComponents"

const InfoItem = ({ name, size = "s", children }) => (
  <div>
    <SmallTextBlock>{name}</SmallTextBlock>
    <TextBlock size={size} bold>
      {children}
    </TextBlock>
  </div>
)

export default InfoItem
