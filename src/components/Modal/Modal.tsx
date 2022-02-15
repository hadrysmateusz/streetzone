import React, { useCallback, useMemo, useState } from "react"
import { Portal } from "react-portal"

import { useBodyScrollLock } from "../../hooks"

import { ModalBox, ModalContainer } from "./Modal.styles"

export type ModalRenderProps = {
  open: () => void
  close: () => void
  isOpen: boolean
  modal: (children: React.ReactNode) => React.ReactNode
}

export type ModalRenderMethod = (
  renderProps: ModalRenderProps
) => React.ReactElement

export const StatefulModal: React.FC<{
  children: ModalRenderMethod
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const wrapWithModal = useCallback(
    (children) => {
      if (!isOpen) return null

      return <Modal onRequestClose={close}>{children}</Modal>
    },
    [close, isOpen]
  )

  const renderProps = useMemo(
    () => ({ open, close, isOpen, modal: wrapWithModal }),
    [close, isOpen, open, wrapWithModal]
  )

  return children(renderProps)
}

export const Modal: React.FC<{ onRequestClose: () => void }> = ({
  children,
  onRequestClose,
}) => {
  const { scrollableRef } = useBodyScrollLock<HTMLDivElement>(true)

  const closeOnEsc = useCallback<React.KeyboardEventHandler>(
    (e) => {
      if (e.key === "Escape") {
        onRequestClose()
      }
    },
    [onRequestClose]
  )

  const onContainerClick = useCallback(
    (e) => {
      // prevent click events on the trigger from propagating to the rest of the React tree
      e.stopPropagation()
      e.preventDefault()
      // call the on request close handler
      onRequestClose()
    },
    [onRequestClose]
  )

  return (
    <Portal>
      <ModalContainer
        ref={scrollableRef}
        onKeyDown={closeOnEsc}
        onClick={onContainerClick}
      >
        <ModalBox
          onClick={(e) => {
            // prevent click events in the modal from accidentally closing it
            e.stopPropagation()
          }}
        >
          {children}
        </ModalBox>
      </ModalContainer>
    </Portal>
  )
}

export default Modal
