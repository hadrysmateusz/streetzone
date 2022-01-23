import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"

import ProfilePicture from "../../components/ProfilePicture"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { Button, ButtonContainer } from "../../components/Button"
import { SaveButton } from "../../components/SaveButton"
import { TextBlock, HorizontalContainer } from "../../components/StyledComponents"
import InfoItem from "../../components/InfoItem"
import { PageContainer } from "../../components/Containers"
import ContactModal from "../../components/ContactModal"
import UserRating from "../../components/UserRating"

import useContentToggle from "../../hooks/useContentToggle"
import { route } from "../../utils"

import {
  MainInfoContainer,
  InfoContainer,
  SecondContainer,
  TopContainer,
} from "./UserMainInfo.styles"

const MainInfo = ({ user, isAuthorized, userId, currentBreakpoint }) => {
  const { getToggleProps, getContentProps } = useContentToggle(false)

  const numDays = moment().diff(user.userSince, "days")

  const infoItemSize = currentBreakpoint >= 3 ? "m" : "s"

  return (
    <PageContainer>
      <MainInfoContainer>
        <TopContainer>
          <div>
            <ProfilePicture
              url={getProfilePictureURL(user, "M")}
              size={currentBreakpoint > 1 ? "125px" : "80px"}
            />
          </div>
          <InfoContainer>
            <TextBlock bold size="m">
              {user.name} <UserRating feedback={user.feedback} />
            </TextBlock>
            <HorizontalContainer gap="3">
              <InfoItem name="W serwisie od" size={infoItemSize}>
                {numDays} dni
              </InfoItem>

              {user.feedback && (
                <InfoItem name="Opinie" size={infoItemSize}>
                  {Array.from(user.feedback).length}
                </InfoItem>
              )}

              {user.city && (
                <InfoItem name="Miasto" size={infoItemSize}>
                  {user.city}
                </InfoItem>
              )}
            </HorizontalContainer>
            {currentBreakpoint > 2 ? (
              <TextBlock color="black50">{user.info}</TextBlock>
            ) : (
              user.info && (
                <>
                  <TextBlock color="gray0" size="xs" {...getToggleProps()}>
                    więcej informacji <FontAwesomeIcon icon="chevron-down" size="xs" />
                  </TextBlock>
                  <TextBlock color="black50" {...getContentProps()}>
                    {user.info}
                  </TextBlock>
                </>
              )
            )}
          </InfoContainer>
        </TopContainer>
        <SecondContainer>
          <ButtonContainer alignRight noMargin vertical={currentBreakpoint < 1}>
            {isAuthorized ? (
              <>
                <Button primary as={Link} to={route("CHAT")} fullWidth={currentBreakpoint <= 1}>
                  <span>Wiadomości</span>
                </Button>
                <Button
                  as={Link}
                  to={route("ACCOUNT_SETTINGS", { id: userId })}
                  fullWidth={currentBreakpoint <= 1}
                >
                  <span>Edytuj Profil</span>
                </Button>
              </>
            ) : (
              <>
                <ContactModal userId={userId}>
                  {({ open }) => (
                    <Button primary onClick={open}>
                      Kontakt
                    </Button>
                  )}
                </ContactModal>
                <SaveButton id={userId} type="user" fullWidth={currentBreakpoint <= 1} />
                {/* <MoreButton title="Więcej">
									<div>Zgłoś naruszenie</div>
								</MoreButton> */}
              </>
            )}
          </ButtonContainer>
        </SecondContainer>
      </MainInfoContainer>
    </PageContainer>
  )
}

export default withBreakpoints(MainInfo)
