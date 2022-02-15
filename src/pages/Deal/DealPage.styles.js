import styled from "styled-components/macro"

export const OuterContainer = styled.div`
  @media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
    margin-top: calc(-1 * var(--page-header-margin));
  }
`

export const Value = styled.div`
  font-size: var(--fs-l);
  color: var(--black25);
  font-weight: bold;
`

// export const DisclaimerContainer = styled.div`
//   font-size: var(--fs-xs);
//   color: var(--gray0);
//   text-transform: uppercase;
//   a {
//     color: var(--black0);
//   }
// `
