import { IconProp } from "@fortawesome/fontawesome-svg-core"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"
import { Button, ButtonProps } from "./Button"

type IconButtonProps = { icon: IconProp } & ButtonProps

const IconButtonUnstyled: React.FC<IconButtonProps> = ({ icon, ...rest }) => (
  <Button {...rest}>
    <FontAwesomeIcon icon={icon} fixedWidth />
  </Button>
)

// TODO: move from boolean big prop to a size prop
export const IconButton = styled(IconButtonUnstyled)`
  padding: 0;
  height: ${(p) => (p.big ? "48px" : "40px")};
  width: ${(p) => (p.big ? "48px" : "40px")};
  flex-shrink: 0;
`
