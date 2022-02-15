import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Thumbnail = styled.div<{ hasError?: boolean }>`
  background: var(--gray);
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  border: 1px solid ${(p) => (p.hasError ? "var(--danger50)" : "var(--gray25)")};

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`

export const IndicatorIcon = styled(FontAwesomeIcon)`
  color: ${(p) => p.color};
  position: relative;
  z-index: 75;
`

export const IndicatorsContainer = styled.div`
  position: absolute;
  z-index: 77;
  top: var(--spacing2);
  right: var(--spacing2);
  display: grid;
  gap: var(--spacing2);
`
