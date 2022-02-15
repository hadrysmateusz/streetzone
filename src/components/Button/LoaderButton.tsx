import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import { SPIN } from "../../style-utils"

import { Button, ButtonProps } from "./Button"

export type LoaderButtonProps = {
  isLoading: boolean
  text: string
  loadingText?: string
} & ButtonProps

const LoaderButtonUnstyled: React.FC<LoaderButtonProps> = ({
  isLoading,
  text,
  loadingText = text,
  ...rest
}) => (
  <Button {...rest}>
    <span className="contentContainer">
      {isLoading && <FontAwesomeIcon className="spinner" icon={"spinner"} />}
      <span className="text">{isLoading ? loadingText : text}</span>
    </span>
  </Button>
)

export const LoaderButton = styled(LoaderButtonUnstyled)`
  .contentContainer {
    position: relative;
    width: auto;
  }

  .spinner {
    margin-right: var(--spacing2);
    position: absolute;
    top: 0.2rem;
    left: -1.3rem;
    animation: ${SPIN} 1.3s linear infinite;
  }
`
