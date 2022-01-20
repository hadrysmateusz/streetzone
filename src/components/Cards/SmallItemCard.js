import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"

import FirebaseImage from "../FirebaseImage"
import { SaveIconButton } from "../SaveButton"

import { route } from "../../utils"

import {
  Name,
  Designers,
  Size,
  Price,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  InfoContainer,
  cardBorder,
} from "./Common"

export const SmallContainer = styled.div`
  min-width: 0; /* this has to be on the outermost component*/
  max-width: 300px;
  width: 100%;
  background: white;

  > a {
    ${cardBorder}
    overflow: hidden;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 140px min-content;
    @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
      grid-template-rows: 165px min-content;
    }
  }
`

const SmallItemCard = memo(({ id, name, designers, size, price, attachments, mainImageIndex }) => (
  <SmallContainer>
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
  </SmallContainer>
))

export default SmallItemCard
