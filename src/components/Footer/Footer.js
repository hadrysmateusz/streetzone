import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CONST, ROUTES } from "../../constants"

import { ImportantText } from "../Basics"
import { TextBlock } from "../StyledComponents"

import {
  ExternalItem,
  Group,
  IconContainer,
  InnerContainer,
  Item,
  OuterContainer,
} from "./Footer.styles"

const Footer = () => (
  <OuterContainer>
    <InnerContainer>
      <Group>
        <TextBlock size="l" bold={true}>
          {CONST.BRAND_NAME}
        </TextBlock>
        <IconContainer>
          <Item to={CONST.TWITTER_PROFILE} icon={true}>
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </Item>
          <Item to={CONST.FACEBOOK_PROFILE} icon={true}>
            <FontAwesomeIcon icon={["fab", "facebook-square"]} />
          </Item>
          <Item to={CONST.INSTAGRAM_PROFILE} icon={true}>
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </Item>
        </IconContainer>

        <Item>© 2019 {CONST.BRAND_NAME}</Item>
      </Group>
      <Group>
        <ImportantText>INFORMACJE</ImportantText>
        <Item to={ROUTES.ABOUT}>O nas</Item>
        <Item to={ROUTES.TERMS}>Regulamin</Item>
        <Item to={ROUTES.PRIVACY_POLICY}>Polityka Prywatności</Item>
      </Group>
      <Group>
        <ImportantText>KONTAKT</ImportantText>
        <Item to={ROUTES.CONTACT}>Kontakt</Item>
        <ExternalItem href={`mailto:${CONST.CONTACT_EMAIL}`}>{CONST.CONTACT_EMAIL}</ExternalItem>
      </Group>
      <Group>
        <ImportantText>POMOC</ImportantText>
        <Item to={ROUTES.FAQ}>FAQ</Item>
        <Item to={ROUTES.BUG_REPORT}>Zgłoś problem</Item>
      </Group>
    </InnerContainer>
  </OuterContainer>
)

export default Footer
