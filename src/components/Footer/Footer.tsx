import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CONST } from "../../constants"

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
import { route } from "../../utils"

const Footer: React.FC = () => (
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

        <Item to={route("ABOUT")}>© 2019 {CONST.BRAND_NAME}</Item>
      </Group>
      <Group>
        <ImportantText>INFORMACJE</ImportantText>
        <Item to={route("ABOUT")}>O nas</Item>
        <Item to={route("TERMS")}>Regulamin</Item>
        <Item to={route("PRIVACY_POLICY")}>Polityka Prywatności</Item>
      </Group>
      <Group>
        <ImportantText>KONTAKT</ImportantText>
        <Item to={route("CONTACT")}>Kontakt</Item>
        <ExternalItem href={`mailto:${CONST.CONTACT_EMAIL}`}>
          {CONST.CONTACT_EMAIL}
        </ExternalItem>
      </Group>
      <Group>
        <ImportantText>POMOC</ImportantText>
        <Item to={route("FAQ")}>FAQ</Item>
        <Item to={route("BUG_REPORT")}>Zgłoś problem</Item>
      </Group>
    </InnerContainer>
  </OuterContainer>
)

export default Footer
