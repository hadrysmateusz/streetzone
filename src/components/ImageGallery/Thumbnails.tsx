import React from "react"
import Ratio from "react-ratio"

import FirebaseImage from "../FirebaseImage"
import {
  InactiveOverlay,
  ThumbnailContainer,
  ThumbnailsContainer,
} from "./Thumbnails.styles"

export const Thumbnail: React.FC<{
  storageRef: string
  onClick: () => void
  isCurrent: boolean
}> = React.memo(({ storageRef, onClick, isCurrent }) => (
  <ThumbnailContainer onClick={onClick} isCurrent={isCurrent}>
    <Ratio>
      <FirebaseImage storageRef={storageRef} size="S" />
    </Ratio>
    {!isCurrent && <InactiveOverlay />}
  </ThumbnailContainer>
))

export const Thumbnails: React.FC<{
  storageRefs: string[]
  onChangeIndex: (index: number) => void
  currentIndex: number
}> = ({ storageRefs, onChangeIndex, currentIndex }) => (
  <ThumbnailsContainer>
    {storageRefs.map((storageRef, i) => (
      <Thumbnail
        storageRef={storageRef}
        key={storageRef}
        isCurrent={currentIndex === i}
        onClick={() => onChangeIndex(i)}
      />
    ))}
  </ThumbnailsContainer>
)
