import { memo } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { route } from "../../utils"

import FirebaseImage from "../FirebaseImage"

import {
  MiddleContainer,
  BottomContainer,
  DateContainer,
  InfoContainer,
  BigCardContainer,
  BigCardTitle,
} from "./Common.styles"
import { ExternalLink, ValueContainer } from "./BigDealCard.styles"

const Value = ({ value, link }) => (
  <ValueContainer>
    <div className="value-container">{value}</div>
    <ExternalLink href={link} onClick={(e) => e.stopPropagation()} title="Idź do okazji">
      <FontAwesomeIcon icon="external-link-alt" />
    </ExternalLink>
  </ValueContainer>
)

const BigDealCard = memo(({ id, title, imageRef, value, link, createdAt }) => (
  <BigCardContainer>
    <Link to={route("DEAL_DETAILS", { id })}>
      <FirebaseImage storageRef={imageRef} size="M" />
      <InfoContainer>
        {/* <TopContainer>
					<Designers value={designers} />
				</TopContainer> */}
        <MiddleContainer flex>
          <BigCardTitle>{title}</BigCardTitle>
          <div className="align-right">
            <Value value={value} link={link} />
          </div>
        </MiddleContainer>
        <BottomContainer>
          <DateContainer>{moment(createdAt).format("LL")}</DateContainer>
        </BottomContainer>
      </InfoContainer>
    </Link>
  </BigCardContainer>
))

export default BigDealCard
