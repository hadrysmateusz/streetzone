import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ProfilePictureContainer = styled.div<{
  inline?: boolean
  size: string
}>`
  display: ${(p) => (p.inline ? "inline-block" : "block")};
  position: relative;
  overflow: hidden;
  border-radius: 50%;

  width: ${(p) => p.size};
  height: ${(p) => p.size};
  min-width: ${(p) => p.size};
  min-height: ${(p) => p.size};
  max-width: ${(p) => p.size};
  max-height: ${(p) => p.size};
  flex: 0 0 ${(p) => p.size};
`

export const ImageContainer = styled.div<{url: string}>`
  height: 100%;
  position: relative;
  z-index: 70;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: ${(p) => `url(${p.url})`};
`

export const PlaceholderIcon = styled(FontAwesomeIcon)`
  height: 100%;
  position: absolute;
  z-index: 60;
  top: 0;
  left: 0;
  color: var(--gray75);
`
