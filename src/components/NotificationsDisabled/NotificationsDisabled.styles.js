import styled, { css } from "styled-components/macro"
import { Link } from "react-router-dom"

import { resetButtonStyles } from "../../style-utils"

export const OuterContainer = styled.div`
  padding: var(--spacing2) 0;
  color: white;
  background: var(--danger0);
  font-size: var(--fs-xs);

  ${(p) =>
    !p.noMargin &&
    css`
      margin-top: calc(-1 * var(--page-header-margin));
      margin-bottom: var(--page-header-margin);
    `}
`

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    flex-direction: row;
  }
`

export const turnOnNotificationsStyles = css`
  text-decoration: underline;
  font-weight: var(--semi-bold);
  white-space: nowrap;
  @media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
    margin-top: var(--spacing1);
  }
`

export const StyledLink = styled(Link)`
  ${turnOnNotificationsStyles}
`

export const StyledButton = styled.button`
  ${resetButtonStyles}
  ${turnOnNotificationsStyles}
  color: white;
`

export const Message = styled.div`
  em {
    font-style: initial;
    font-weight: var(--semi-bold);
  }
`
