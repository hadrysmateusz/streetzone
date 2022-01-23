import { useState } from "react"

import { IconButton } from "../Button"
import Overlay from "../Overlay"

import { OuterContainer, Submenu, SubmenuContainer } from "./MoreButton.styles"

const MoreButton = ({ children, icon = "ellipsis-h", title = "Więcej" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClick = () => {
    setIsOpen((state) => !state)
  }

  return (
    <OuterContainer>
      <IconButton icon={icon} title={title} onClick={onClick} />
      {isOpen && (
        <>
          <SubmenuContainer>
            <Submenu>{children}</Submenu>
          </SubmenuContainer>
          <Overlay onClick={onClick} />
        </>
      )}
    </OuterContainer>
  )
}

export default MoreButton
