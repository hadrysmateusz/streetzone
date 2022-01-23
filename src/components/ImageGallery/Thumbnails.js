import React from "react"
import Ratio from "react-ratio"

import FirebaseImage from "../FirebaseImage"
import { InactiveOverlay, ThumbnailContainer, ThumbnailsContainer } from "./Thumbnails.styles"

export const Thumbnail = React.memo(({ storageRef, onClick, isCurrent }) => (
  <ThumbnailContainer onClick={onClick} isCurrent={isCurrent}>
    <Ratio>
      <FirebaseImage storageRef={storageRef} size="S" />
    </Ratio>
    {!isCurrent && <InactiveOverlay />}
  </ThumbnailContainer>
))

export const Thumbnails = ({ storageRefs, onChangeIndex, current }) => (
  <ThumbnailsContainer>
    {storageRefs.map((storageRef, i) => (
      <Thumbnail
        storageRef={storageRef}
        key={storageRef}
        isCurrent={current === i}
        onClick={() => onChangeIndex(i)}
      />
    ))}
  </ThumbnailsContainer>
)
