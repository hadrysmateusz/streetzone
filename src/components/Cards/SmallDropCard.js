import { memo } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import { route } from "../../utils"

import FirebaseImage from "../FirebaseImage"

import {
  Name,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  DateContainer,
  InfoContainer,
  SmallCardContainer,
} from "./Common.styles"
import { Designers } from "./Common"

const SmallDropCard = memo(
  ({ id, name, designers, itemCategory, attachments, mainImageIndex, dropsAtApproxTimestamp }) => (
    <SmallCardContainer>
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
    </SmallCardContainer>
  )
)

export default SmallDropCard
