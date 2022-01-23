import { memo } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import { route } from "../../utils"

import FirebaseImage from "../FirebaseImage"
import DropCountdown from "../DropCountdown"

import {
  TopContainer,
  MiddleContainer,
  BottomContainer,
  DateContainer,
  InfoContainer,
  BigCardContainer,
  BigCardTitle,
} from "./Common.styles"
import { Designers } from "./Common"

const BigDropCard = memo(
  ({
    id,
    name,
    designers,
    itemCategory,
    attachments,
    mainImageIndex,
    dropsAtApproxTimestamp,
    dropsAtString,
  }) => (
    <BigCardContainer>
      <Link to={route("DROP_DETAILS", { id })}>
        <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
        <InfoContainer>
          <TopContainer>
            <div>{itemCategory}</div>
            <Designers value={designers} />
          </TopContainer>
          <MiddleContainer flex>
            <BigCardTitle>{name}</BigCardTitle>
            <div className="align-right">
              <DropCountdown dropsAt={dropsAtString} id={id} />
            </div>
          </MiddleContainer>
          <BottomContainer>
            <DateContainer>{moment(dropsAtApproxTimestamp).format("LL")}</DateContainer>
          </BottomContainer>
        </InfoContainer>
      </Link>
    </BigCardContainer>
  )
)

export default BigDropCard
