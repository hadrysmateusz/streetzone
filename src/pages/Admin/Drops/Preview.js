import { Link } from "react-router-dom"
import moment from "moment"

import { Button, ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"
import FirebaseImage from "../../../components/FirebaseImage"

import { route, itemDataHelpers } from "../../../utils"
import { useDeleteDocument } from "../../../hooks"

import { BuyAtLink, BuyAtList, DropContainer } from "./Preview.styles"

const { formatDesigners } = itemDataHelpers

const DropPreview = ({
  id,
  attachments,
  mainImageIndex,
  name,
  description,
  dropsAtString,
  designers,
  price,
  howMany,
  buyAt,
  itemCategory,
  createdAt,
  editedAt,
}) => {
  const formattedDesigners = formatDesigners(designers)
  const deleteDocument = useDeleteDocument(`drops/${id}`)

  return (
    <DropContainer>
      <TextBlock color="gray0" uppercase>
        {itemCategory}
        &nbsp;
        <b>{formattedDesigners}</b>
      </TextBlock>

      <TextBlock bold size="l">
        {name}
      </TextBlock>

      <TextBlock color="gray0" size="xs" uppercase>
        Dodano {moment(createdAt).format("D.M.YY o HH:mm")}
      </TextBlock>

      <TextBlock color="gray0" size="xs" uppercase>
        Edytowano {moment(editedAt).format("D.M.YY o HH:mm")}
      </TextBlock>

      <TextBlock color="black100">
        Data dropu: <b>{dropsAtString}</b>
      </TextBlock>
      {price && (
        <TextBlock color="black100">
          Cena: <b>{price}</b>
        </TextBlock>
      )}

      {howMany && (
        <TextBlock color="black100">
          Nakład: <b>{howMany}</b>
        </TextBlock>
      )}

      {buyAt && (
        <>
          <TextBlock color="black100">Gdzie kupić:</TextBlock>
          <BuyAtList>
            {buyAt.map(({ link, name }) => (
              <BuyAtLink href={link} title={link}>
                {name}
              </BuyAtLink>
            ))}
          </BuyAtList>
        </>
      )}

      <TextBlock color="#333">Opis: {description}</TextBlock>

      <FirebaseImage
        storageRef={attachments[mainImageIndex]}
        size="M"
        height="150px"
        width="150px"
      />

      <ButtonContainer>
        <Button as={Link} to={route("ADMIN_DROPS_EDIT", { id })}>
          Edytuj
        </Button>
        <Button danger onClick={deleteDocument}>
          Usuń
        </Button>
      </ButtonContainer>
    </DropContainer>
  )
}

export default DropPreview
