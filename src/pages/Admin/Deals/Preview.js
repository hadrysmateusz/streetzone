import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import moment from "moment"

import { Button, ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"

import { route } from "../../../utils"
import { ellipsis } from "../../../style-utils"
import { useDeleteDocument } from "../../../hooks"
import { getImageUrl } from "../../../utils/getImageUrl"

const ImageContainer = styled.div`
  img {
    max-height: 100px;
    max-width: 300px;
  }
`

const DealLink = styled.a`
  ${ellipsis}
`

const OuterContainer = styled.div`
  border: 1px solid black;
  padding: var(--spacing3);
`

const DealPreview = ({ id, imageRef, title, description, value, link, createdAt, editedAt }) => {
  const imageUrl = getImageUrl(imageRef, "M")
  const deleteDocument = useDeleteDocument(`deals/${id}`)

  return (
    <OuterContainer>
      <TextBlock bold size="l">
        {title}
      </TextBlock>

      <TextBlock color="gray0" size="xs" uppercase>
        Dodano {moment(createdAt).format("D.M.YY o HH:mm")}
      </TextBlock>

      <TextBlock color="gray0" size="xs" uppercase>
        Edytowano {moment(editedAt).format("D.M.YY o HH:mm")}
      </TextBlock>

      {value && (
        <TextBlock color="black100">
          Wartość: <b>{value}</b>
        </TextBlock>
      )}

      <DealLink href={link}>{link}</DealLink>

      <TextBlock color="#333">Opis: {description}</TextBlock>

      <ImageContainer>
        <img src={imageUrl} alt="" />
      </ImageContainer>

      <ButtonContainer>
        <Button as={Link} to={route("ADMIN_DEALS_EDIT", { id })}>
          Edytuj
        </Button>
        <Button danger onClick={deleteDocument}>
          Usuń
        </Button>
      </ButtonContainer>
    </OuterContainer>
  )
}

export default DealPreview
