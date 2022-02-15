import { connectCurrentRefinements, connectStats } from "react-instantsearch-dom"
import { compose } from "recompose"

import { PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"
import { useDesigner } from "../../hooks"
import { getImageUrl } from "../../utils/getImageUrl"

import { InnerContainer, OuterContainer, Logo } from "./DesignerBanner.styles"

const Header = compose(
  connectStats,
  connectCurrentRefinements
)(({ items, nbHits }) => {
  const appliedFilters = items
  const selectedDesigners = appliedFilters.find((filter) => filter.attribute === "designers")
  const designerList = selectedDesigners ? selectedDesigners.currentRefinement : null
  const hasOneDesigner = designerList && designerList.length === 1
  const selectedDesigner = hasOneDesigner ? designerList[0] : null

  const designer = useDesigner(selectedDesigner)

  return designer ? (
    <OuterContainer {...designer}>
      <PageContainer noMargin>
        <InnerContainer>
          {designer.imageRef && (
            <Logo src={getImageUrl(designer.imageRef, "M")} alt={`logo ${designer.label}`} />
          )}
          <div className="info-container">
            <TextBlock size="l" bold color="white">
              {designer.label}
            </TextBlock>
            <TextBlock>
              <b>{nbHits}</b> przedmiotów
            </TextBlock>
          </div>
        </InnerContainer>
      </PageContainer>
    </OuterContainer>
  ) : null
})

export default Header
