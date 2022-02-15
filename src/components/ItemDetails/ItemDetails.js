import { memo } from "react"
import { Link } from "react-router-dom"
import Ratio from "react-ratio"

import { useDesigner } from "../../hooks"
import { encodeURL } from "../../utils/algoliaURLutils"
import { route, itemDataHelpers } from "../../utils"

import FirebaseImage from "../FirebaseImage"

import { BrandsContainer, DesignerItemContainer, HeaderContainer } from "./ItemDetails.styles"

const { formatDesigners } = itemDataHelpers

export const DesignerLink = ({ value, children }) => (
  <Link to={encodeURL({ designers: [value] }, route("MARKETPLACE"))}>{children}</Link>
)

export const Brands = ({ designers }) => (
  <BrandsContainer>
    {designers.map((designer) => (
      <DesignerItem name={designer} key={designer.id} />
    ))}
  </BrandsContainer>
)

export const DesignerItem = memo(({ name }) => {
  const designer = useDesigner(name)

  return designer && designer.imageRef ? (
    <DesignerItemContainer>
      <DesignerLink value={designer.label}>
        <Ratio>
          <FirebaseImage storageRef={designer.imageRef} size="S" title={designer.label} />
        </Ratio>
      </DesignerLink>
    </DesignerItemContainer>
  ) : null
})

export const Header = ({ designers, name }) => {
  let formattedDesigners = formatDesigners(designers)

  return (
    <HeaderContainer>
      <div className="designers">{formattedDesigners}</div>
      <div className="name">{name}</div>
    </HeaderContainer>
  )
}
