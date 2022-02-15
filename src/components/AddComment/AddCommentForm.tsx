import React from "react"

import { ButtonContainer } from "../Button"
import { FormSubmitButton, RatingFF, TextareaFF } from "../FinalFormFields"
import { SmallTextBlock } from "../StyledComponents"

import { Group, RatingContainer } from "./AddComment.styles"
import validate from "./AddCommentForm.validate"
import { FinalFormSimpleForm } from "../FinalFormSimpleForm"
import { FinalFormOnSubmit } from "../../types"
import { AddCommentFormValues } from "./types"

export const AddCommentForm: React.FC<{
  onSubmit: FinalFormOnSubmit<AddCommentFormValues>
  initialValues: AddCommentFormValues | undefined
}> = ({ onSubmit, initialValues }) => {
  console.log("initialValues",initialValues)
  return (
    <FinalFormSimpleForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      <Group>
        {/* Comment */}
        <SmallTextBlock>Treść komentarza</SmallTextBlock>
        <TextareaFF name="comment" placeholder="Komentarz" />
      </Group>

      <Group>
        {/* Rating */}
        <SmallTextBlock>Ocena sprzedawcy</SmallTextBlock>
        <RatingContainer>
          <RatingFF name="rating" />
        </RatingContainer>
      </Group>

      <ButtonContainer noMargin>
        <FormSubmitButton text="Wystaw opinie" big />
      </ButtonContainer>
    </FinalFormSimpleForm>
  )
}
