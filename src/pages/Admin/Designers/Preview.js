import { Button, LinkButton, ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"

import { route, getImageUrl } from "../../../utils"
import { useDeleteDocument } from "../../../hooks"

import {
  DesignerItemContainer,
  FlexContainer,
  GradientSwatch,
  LogoContainer,
} from "./Preview.styles"

const DesignerPreview = ({ id, imageRef, label, colorA, colorB }) => {
  const logoUrl = getImageUrl(imageRef, "M")
  const deleteDocument = useDeleteDocument(`designers/${id}`)

  return (
    <DesignerItemContainer>
      <TextBlock size="l" bold>
        {label}
      </TextBlock>
      <FlexContainer>
        <GradientSwatch colorA={colorA} colorB={colorB} />
        <LogoContainer url={logoUrl} />
      </FlexContainer>
      <ButtonContainer>
        <Button danger onClick={deleteDocument}>
          Usuń
        </Button>
        <LinkButton to={route("ADMIN_DESIGNER_EDIT", { id })}>Edytuj</LinkButton>
      </ButtonContainer>
    </DesignerItemContainer>
  )
}

export default DesignerPreview
