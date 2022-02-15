import styled from "styled-components/macro"

export const Header = styled.header<{ noMargin?: boolean; isFolded?: boolean }>`
  padding: ${(p) => (p.noMargin ? "0" : "var(--spacing3)")};
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    transition: transform 0.32s ease;
    ${(p) => p.isFolded && "transform: rotate(-180deg);"}
  }
`

export const Flex = styled.div`
  display: flex;
`

export const Content = styled.div`
  padding: 0 var(--spacing3) var(--spacing3);
`
