import React, { useState, useRef, useContext, useLayoutEffect } from "react"
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"
import { Portal } from "react-portal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { TextBlock } from "../StyledComponents"

import { CloseIconContainer, FullscreenContainer, HeaderContainer } from "./FullscreenMenu.styles"

export const FullscreenMenuContext = React.createContext()

export const Header = ({ children }) => {
  const isCustomContent = typeof children !== "string"
  const { close } = useContext(FullscreenMenuContext)

  return (
    <HeaderContainer>
      {isCustomContent ? (
        <div>{children}</div>
      ) : (
        <TextBlock size="m" bold>
          {children}
        </TextBlock>
      )}
      <CloseIconContainer onClick={close}>
        <FontAwesomeIcon icon="times" />
      </CloseIconContainer>
    </HeaderContainer>
  )
}

const Menu = ({
  onClose,
  onOpen,
  renderWhenClosed,
  renderWhenOpen,
  animate = true,
  startOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(startOpen)
  const containerRef = useRef()

  const close = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  const open = () => {
    setIsOpen(true)
    if (onOpen) onOpen()
  }

  useLayoutEffect(() => {
    if (isOpen) {
      disableBodyScroll(containerRef.current)
    } else {
      enableBodyScroll(containerRef.current)
    }

    return clearAllBodyScrollLocks
  }, [isOpen])

  const contextValue = { close, open, containerRef }

  return (
    <FullscreenMenuContext.Provider value={contextValue}>
      {isOpen ? (
        <Portal>
          <FullscreenContainer ref={containerRef} animate={animate}>
            {renderWhenOpen ? renderWhenOpen(contextValue) : null}
          </FullscreenContainer>
        </Portal>
      ) : renderWhenClosed ? (
        renderWhenClosed(contextValue)
      ) : (
        <button onClick={open}>Otwórz Menu</button>
      )}
    </FullscreenMenuContext.Provider>
  )
}

export default Menu
