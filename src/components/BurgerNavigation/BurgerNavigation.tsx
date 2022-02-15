import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CONST } from "../../constants"

import FullscreenMenu, { Header } from "../FullscreenMenu"

import { IconContainer, MenuNavItem } from "./BurgerNavigation.styles"

const BurgerNavigation: React.FC = ({ children }) => (
  <FullscreenMenu
    renderWhenClosed={({ open }) => (
      <IconContainer onClick={open}>
        <FontAwesomeIcon icon="bars" />
      </IconContainer>
    )}
    renderWhenOpen={({ close }) => (
      <>
        <Header>{CONST.BRAND_NAME}</Header>
        {/* TODO: figure out better value to use as key */}
        {React.Children.map(children, (child, i) =>
          child ? (
            <MenuNavItem key={i} onClick={close}>
              {child}
            </MenuNavItem>
          ) : null
        )}
      </>
    )}
  />
)

export default BurgerNavigation
