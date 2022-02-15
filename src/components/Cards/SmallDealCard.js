import { memo } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import { route } from "../../utils"

import FirebaseImage from "../FirebaseImage"

import {
  Name,
  MiddleContainer,
  BottomContainer,
  DateContainer,
  InfoContainer,
  SmallCardContainer,
} from "./Common.styles"

const SmallDealCard = memo(({ id, title, imageRef, createdAt }) => (
  <SmallCardContainer>
    <Link to={route("DEAL_DETAILS", { id })}>
      <FirebaseImage storageRef={imageRef} size="M" />
      <InfoContainer>
        {/* <TopContainer>
					<Designers value={designers} />
				</TopContainer> */}
        <MiddleContainer>
          <Name>{title}</Name>
        </MiddleContainer>
        <BottomContainer>
          <DateContainer>{moment(createdAt).format("LL")}</DateContainer>
        </BottomContainer>
      </InfoContainer>
    </Link>
  </SmallCardContainer>
))

export default SmallDealCard
