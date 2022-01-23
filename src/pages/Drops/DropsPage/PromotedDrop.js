import { Link } from "react-router-dom"
import moment from "moment"
// import PropTypes from "prop-types"

import { route } from "../../../../utils"

import { PromotedDropContainer } from "./PromotedDrop.styles"

const PromotedDrop = ({ id, mainImageIndex, imageUrls, name, dropsAtApproxTimestamp }) => {
  const imageUrl = imageUrls ? imageUrls[mainImageIndex] : ""
  const date = moment().to(moment(dropsAtApproxTimestamp))

  return (
    <Link to={route("DROP_DETAILS", { id })}>
      <PromotedDropContainer image={imageUrl}>
        <div className="bottom-container">
          <div className="name">{name}</div>
          {date && <div className="details">{date}</div>}
        </div>
      </PromotedDropContainer>
    </Link>
  )
}

// PromotedDrop.propTypes = {
//   id: PropTypes.string.isRequired,
//   mainImageIndex: PropTypes.number.isRequired,
//   imageUrls: PropTypes.array.isRequired,
//   name: PropTypes.string.isRequired,
//   dropsAtApproxTimestamp: PropTypes.number.isRequired,
// }

export default PromotedDrop
