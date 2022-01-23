import styled from "styled-components/macro"

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
  min-height: 0;
  max-height: 100%;

  font-size: var(--font-size--m);
  font-weight: bold;

  flex: 1;
  user-select: none;
  position: relative;
  white-space: nowrap;
  width: 100px;
  transition: transform 200ms ease;
  :hover {
    transform: rotate(-2deg);
  }

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    width: 120px;
  }

  color: var(--black75);

  ${(p) =>
    p.centered &&
    `display: flex;
		align-items: center;
		justify-content: center;`}
`
