import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ErrorIcon = styled(FontAwesomeIcon).attrs({ icon: "exclamation-circle" })`
  font-size: 5rem;
  path {
    color: var(--gray100);
  }
`

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 7;
`

export const Image = styled.img`
  width: ${(p) => p.width || "100%"};
  height: ${(p) => p.height || "100%"};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  object-position: center;
  object-fit: ${(p) => p.mode};
`
