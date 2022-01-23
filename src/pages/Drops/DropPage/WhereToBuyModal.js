import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { StatefulModal } from "../../../components/Modal/Modal"

import {
  GoToButton,
  Header,
  IconContainer,
  List,
  ListItem,
  ModalOuterContainer,
  StyledLink,
} from "./WhereToBuyModal.styles"

const WhereToBuyModal = ({ children, links = [] }) => {
  return (
    <StatefulModal>
      {({ open, close, isOpen, modal }) => (
        <>
          {children({ open, close, isOpen, modal })}
          {modal(
            <ModalOuterContainer>
              <Header>
                <div>Gdzie kupić</div>
                <IconContainer onClick={close}>
                  <FontAwesomeIcon icon="times" />
                </IconContainer>
              </Header>
              <List>
                {links.map(({ link, name }) => (
                  <ListItem key={link}>
                    <StyledLink href={link}>{name}</StyledLink>
                    <GoToButton href={link}>
                      <span>Przejdź do strony</span>
                      <FontAwesomeIcon icon="external-link-alt" />
                    </GoToButton>
                  </ListItem>
                ))}
              </List>
            </ModalOuterContainer>
          )}
        </>
      )}
    </StatefulModal>
  )
}

export default WhereToBuyModal
