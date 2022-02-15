import { memo } from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import { route } from "../../utils"

import FirebaseImage from "../FirebaseImage"

import {
  Name,
  PostCategory,
  DateContainer,
  MiddleContainer,
  BottomContainer,
  InfoContainer,
  SmallCardContainer,
} from "./Common.styles"

const PostCard = memo(({ id, title, category, attachments, mainImageIndex, createdAt }) => (
  <SmallCardContainer>
    <Link to={route("BLOG_POST", { id })}>
      <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
      <InfoContainer>
        <MiddleContainer>
          <Name>{title}</Name>
        </MiddleContainer>
        <BottomContainer>
          <PostCategory category={category}>{category}</PostCategory>
          <DateContainer>&nbsp;&nbsp;/&nbsp;&nbsp;{moment(createdAt).format("LL")}</DateContainer>
        </BottomContainer>
      </InfoContainer>
    </Link>
  </SmallCardContainer>
))

export default PostCard
