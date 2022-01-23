import { useState } from "react"
import { Portal } from "react-portal"

import { useBodyScrollLock } from "../../hooks"

import { ModalBox, ModalContainer } from "./Modal.styles"

export const StatefulModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState()

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const wrapWithModal = (children) => {
    if (!isOpen) return null

    return (
      <Modal onRequestClose={close} isOpen>
        {children}
      </Modal>
    )
  }

  return children({ open, close, isOpen, modal: wrapWithModal })
}

export const Modal = ({ children, onRequestClose }) => {
  const scrollableRef = useBodyScrollLock(true)

  const closeOnEsc = (e) => {
    if (e.key === "Escape") {
      onRequestClose()
    }
  }

  return (
    <Portal>
      <ModalContainer
        ref={scrollableRef}
        onKeyDown={closeOnEsc}
        onClick={(e) => {
          // prevent click events on the trigger from propagating to the rest of the React tree
          e.stopPropagation()
          e.preventDefault()
          // call the on request close handler
          onRequestClose()
        }}
      >
        <ModalBox
          onClick={(e) => {
            // prevent click events in the modal from accidentaly closing it
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
