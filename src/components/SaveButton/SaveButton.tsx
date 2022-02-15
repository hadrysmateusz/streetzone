import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconName } from "@fortawesome/fontawesome-svg-core"

import AuthModal from "../AuthModal"
import { Button, ButtonStylingProps } from "../Button"

import { IconButtonContainer } from "./SaveButton.styles"
import { SaveButtonTypes, TYPE } from "./saveButtonTypes"
import { useSave } from "./useSave"

const Icon: React.FC<{ isActive: boolean; icon: IconName }> = ({
  isActive,
  icon,
}) => (
  <div className="fa-layers fa-fw">
    {isActive ? (
      <FontAwesomeIcon className="filled" icon={icon} />
    ) : (
      <FontAwesomeIcon className="outline" icon={["far", icon]} />
    )}
  </div>
)

export const SaveIconButton: React.FC<{
  type: SaveButtonTypes
  id: string
  scale: number
}> = ({ type, id, scale }) => {
  const { icon, text, activeText, animation } = TYPE[type]
  const { isActive, onClick, isAuthenticated } = useSave(type, id)

  return (
    <AuthModal>
      {({ open }) => (
        <IconButtonContainer
          onClick={handlerCreator(isAuthenticated ? onClick : open)}
          scale={scale}
          animation={animation}
          isActive={isActive}
          title={isActive ? activeText : text}
        >
          <Icon isActive={isActive} icon={icon} />
        </IconButtonContainer>
      )}
    </AuthModal>
  )
}

type SaveButtonProps = ButtonStylingProps & {
  type: SaveButtonTypes
  id: string
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  type,
  id,
  ...rest
}) => {
  const { icon, text, activeText } = TYPE[type]
  const { isActive, onClick, isAuthenticated } = useSave(type, id)

  return (
    <AuthModal>
      {({ open }) => (
        <Button
          onClick={handlerCreator(isAuthenticated ? onClick : open)}
          {...rest}
        >
          <Icon isActive={isActive} icon={icon} />
          <div style={{ marginLeft: "3px" }}>
            {isActive ? activeText : text}
          </div>
        </Button>
      )}
    </AuthModal>
  )
}

const handlerCreator =
  (callback: (e: React.MouseEvent) => void) => (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    callback(e)
  }
