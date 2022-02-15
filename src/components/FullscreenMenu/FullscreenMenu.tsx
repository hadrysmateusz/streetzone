import React, { useCallback, useRef, useState } from "react"
import { Portal } from "react-portal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { TextBlock } from "../StyledComponents"

import {
  CloseIconContainer,
  FullscreenContainer,
  HeaderContainer,
} from "./FullscreenMenu.styles"
import { useBodyScrollLock } from "../../hooks"
import {
  FullscreenMenuContext,
  FullscreenMenuContextValue,
  useFullscreenMenu,
} from "./FullscreenMenu.context"

export const Header: React.FC = ({ children }) => {
  const { close } = useFullscreenMenu()

  const isCustomContent = typeof children !== "string"

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

const Menu: React.FC<{
  animate?: boolean
  startOpen?: boolean
  renderWhenClosed: (context: FullscreenMenuContextValue) => React.ReactNode
  renderWhenOpen: (context: FullscreenMenuContextValue) => React.ReactNode
  onClose?: () => void
  onOpen?: () => void
}> = ({
  onClose,
  onOpen,
  renderWhenClosed,
  renderWhenOpen,
  animate = true,
  startOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(startOpen)
  const containerRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  const open = useCallback(() => {
    setIsOpen(true)
    onOpen?.()
  }, [onOpen])

  useBodyScrollLock(isOpen, containerRef)

  const contextValue: FullscreenMenuContextValue = { close, open, containerRef }

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
