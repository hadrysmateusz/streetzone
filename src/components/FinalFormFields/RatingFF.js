import { Field } from "react-final-form"
import StarRatings from "react-star-ratings"

import { FormElementContainer } from "../FormElements"

import { Section } from "./Common.styles"

export const RatingFF = ({ label, name, info }) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name}>
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
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
      }}
    </Field>
  </Section>
)
