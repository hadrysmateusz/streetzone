import React, { memo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import moment from "moment"

import FirebaseImage from "../FirebaseImage"

import { route } from "../../utils"

import {
  Name,
  Designers,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  DateContainer,
  InfoContainer,
  cardBorder,
} from "./Common"

const Container = styled.div`
  min-width: 0; /* this has to be on the outermost component*/
  max-width: 310px;
  width: 100%;
  background: white;

  a {
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

const SmallDropCard = memo(
  ({ id, name, designers, itemCategory, attachments, mainImageIndex, dropsAtApproxTimestamp }) => (
    <Container>
      <Link to={route("DROP_DETAILS", { id })}>
        <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
        <InfoContainer>
          <TopContainer>
            <div>{itemCategory}</div>
            <Designers value={designers} />
          </TopContainer>
          <MiddleContainer>
            <Name>{name}</Name>
          </MiddleContainer>
          <BottomContainer>
            <DateContainer>{moment(dropsAtApproxTimestamp).format("LL")}</DateContainer>
          </BottomContainer>
        </InfoContainer>
      </Link>
    </Container>
  )
)

export default SmallDropCard
