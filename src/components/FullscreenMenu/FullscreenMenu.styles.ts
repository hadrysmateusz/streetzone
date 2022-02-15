import styled, { keyframes, css, Keyframes } from "styled-components/macro"

import Div100vh from "../Div100vh"

const DEFAULT_ANIMATION_TIME = "150ms"
const DEFAULT_ANIMATION = keyframes`
	from  {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
`

const animate = (
  animationKeyframes = DEFAULT_ANIMATION,
  animationTime = DEFAULT_ANIMATION_TIME
) => css`
  animation: ${animationKeyframes} ${animationTime};
`

export type FullscreenContainerProps = { children?: React.ReactNode } & (
  | {
      animate: true
      animationKeyframes?: Keyframes
      animationTime?: string
    }
  | {
      animate: false
      animationKeyframes?: undefined
      animationTime?: undefined
    }
)

export const FullscreenContainer = styled(Div100vh)<FullscreenContainerProps>`
  width: 100%;
  min-width: 0;
  position: fixed;
  padding-top: var(--page-header-height);
  top: 0;
  left: 0;
  background: white;
  overflow-y: auto;

  ${(p) => !!p.animate && animate(p.animationKeyframes, p.animationTime)}
`

export const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid var(--gray75);
  height: var(--page-header-height);
  padding: 0 var(--spacing3);
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-auto-flow: column;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`

export const CloseIconContainer = styled.span`
  cursor: pointer;
  padding: var(--spacing1);
`
