import {
  TextBlock,
  SmallTextBlock,
  BodyTextBaseProps,
} from "../StyledComponents"

const InfoItem: React.FC<{
  name: string
  size?: BodyTextBaseProps["size"]
}> = ({ name, size = "s", children }) => (
  <div>
    <SmallTextBlock>{name}</SmallTextBlock>
    <TextBlock size={size} bold>
      {children}
    </TextBlock>
  </div>
)

export default InfoItem
