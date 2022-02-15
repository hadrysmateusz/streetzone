import { Link } from "react-router-dom"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { route } from "../../utils"

import { PromotedPostContainer } from "./PromotedPost.styles"

const PromotedPost = ({ title, author, category, createdAt, mainImageIndex, imageUrls, id }) => {
  const date = moment(createdAt).format("LL")

  const imageUrl = imageUrls[mainImageIndex]

  return (
    <Link to={route("BLOG_POST", { id })}>
      <PromotedPostContainer image={imageUrl} category={category}>
        <div className="info-container">
          <div className="title">{title}</div>
          <div className="info">{category}</div>
          <div className="additional-info">
            <FontAwesomeIcon icon="user" size="sm" />
            &nbsp;&nbsp;{author}&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon="calendar" size="sm" />
            &nbsp;&nbsp;{date}
          </div>
        </div>
      </PromotedPostContainer>
    </Link>
  )
}

export default PromotedPost
