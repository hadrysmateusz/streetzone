import React from "react"
import StarRatings from "react-star-ratings"

import { FormElementContainer } from "../FormElements"

import { CommonFieldProps, CommonUnwrappedFieldProps } from "./types"
import { SimpleFFWrapper } from "./HelperComponents"
import { useFieldWithError } from "./Helpers"

type FieldValue = number
type RatingFFBaseProps = {}
type RatingFFProps = CommonUnwrappedFieldProps & RatingFFBaseProps
type RatingFFWrappedProps = CommonFieldProps & RatingFFBaseProps

export const RatingFF: React.FC<RatingFFWrappedProps> = ({
  label,
  ...rest
}) => {
  return (
    <SimpleFFWrapper label={label}>
      <RatingFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

export const RatingFFUnwrapped: React.FC<RatingFFProps> = ({ name, info }) => {
  const { input, error } = useFieldWithError<FieldValue>(name)

  return (
    <FormElementContainer error={error} info={info}>
      <StarRatings
        rating={+input.value}
        changeRating={input.onChange}
        starRatedColor="gold"
        starHoverColor="#ffc311"
        numberOfStars={5}
        starDimension="20px"
        starSpacing="2px"
      />
    </FormElementContainer>
  )
}
