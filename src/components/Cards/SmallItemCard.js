import { memo } from "react"
import { Link } from "react-router-dom"

import { route } from "../../utils"

import FirebaseImage from "../FirebaseImage"
import { SaveIconButton } from "../SaveButton"

import {
  Name,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  InfoContainer,
  SmallCardContainer,
} from "./Common.styles"
import { Designers, Size, Price } from "./Common"

const SmallItemCard = memo(({ id, name, designers, size, price, attachments, mainImageIndex }) => (
  <SmallCardContainer>
    <Link to={route("ITEM_DETAILS", { id })}>
      <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
      <InfoContainer>
        <TopContainer>
          <Designers value={designers} />
          <Size value={size} />
        </TopContainer>
        <MiddleContainer>
          <Name>{name}</Name>
        </MiddleContainer>
        <BottomContainer>
          <Price value={price} />
          <div className="align-right">
            <SaveIconButton
              style={{ color: "var(--gray25)", paddingRight: "0" }}
              id={id}
              type="item"
              scale={1.5}
            />
          </div>
        </BottomContainer>
      </InfoContainer>
    </Link>
  </SmallCardContainer>
))

export default SmallItemCard
