import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import moment from "moment"

import LoadingSpinner from "../../../components/LoadingSpinner"
import Button, { ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"
import { PageContainer } from "../../../components/Containers"

import { route, itemDataHelpers } from "../../../utils"
import { ellipsis } from "../../../style-utils"
import { useImage, useFirebase, useFirestoreCollection } from "../../../hooks"

const { formatDesigners } = itemDataHelpers

const ImageContainer = styled.div`
  img {
    max-height: 100px;
    max-width: 300px;
  }
`

const DealLink = styled.a`
  ${ellipsis}
`

const List = styled.div`
  display: grid;
  gap: var(--spacing2);
  grid-template-columns: 1fr 1fr;

  > * {
    overflow: hidden;
  }
`

const OuterContainer = styled.div`
  border: 1px solid black;
  padding: var(--spacing3);
`

const Deal = ({
  id,
  imageRef,
  title,
  description,
  designers,
  value,
  link,
  createdAt,
  editedAt,
}) => {
  const firebase = useFirebase()

  // console.log(imageRef)

  const { imageURL } = useImage(imageRef)

  const formattedDesigners = formatDesigners(designers)

  const onDelete = (id) => {
    try {
      const shouldDelete = window.confirm(`Czy napewno chcesz USUNĄĆ "${title}"?`)
      if (shouldDelete) {
        firebase.deal(id).delete()
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <OuterContainer>
      <TextBlock color="gray0" uppercase>
        <b>{formattedDesigners}</b>
      </TextBlock>

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
        <img src={imageURL} alt="" />
      </ImageContainer>

      <ButtonContainer>
        <Button as={Link} to={route("ADMIN_DEALS_EDIT", { id })}>
          Edytuj
        </Button>
        <Button onClick={() => onDelete(id)}>Usuń</Button>
      </ButtonContainer>
    </OuterContainer>
  )
}

const DealsManagement = () => {
  const deals = useFirestoreCollection("deals")

  const hasDeals = deals && deals.length > 0

  return !deals ? (
    <LoadingSpinner fixedHeight />
  ) : (
    <PageContainer>
      <TextBlock size="xl" bold>
        Okazje
      </TextBlock>

      <ButtonContainer>
        <Button primary big fullWidth as={Link} to={route("ADMIN_DEALS_ADD")}>
          Dodaj okazje
        </Button>
      </ButtonContainer>

      <List>{hasDeals && deals.map((deal) => <Deal {...deal} />)}</List>
    </PageContainer>
  )
}

export default DealsManagement
