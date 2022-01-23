import { FORM_ERR, CONST } from "../../constants"

const validate = ({ rating, comment }) => {
  const errors = {}

  // Rating
  if (!rating) {
    errors.rating = FORM_ERR.IS_REQUIRED
  }

  // Comment
  if (!comment || comment.trim().length === 0) {
    errors.comment = FORM_ERR.IS_REQUIRED
  } else if (comment && comment.length > CONST.COMMENT_MAX_CHARACTERS) {
    errors.comment = FORM_ERR.DESC_TOO_LONG
  }

  console.warn(errors)

  return errors
}

export default validate
