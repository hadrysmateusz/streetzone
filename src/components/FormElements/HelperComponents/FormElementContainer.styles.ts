import styled from "styled-components/macro"

interface InfoContainerProps {
  hasError: boolean
}

export const InfoContainer = styled.div<InfoContainerProps>`
  font-size: var(--font-size--xs);
  color: ${(p) => (p.hasError ? "var(--danger50)" : "var(--gray0)")};
  display: flex;
  align-items: center;
  margin-top: var(--spacing1);
`
