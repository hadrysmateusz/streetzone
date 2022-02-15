import React from "react"
import LazyLoad from "react-lazy-load"

import { getImageUrls, ThumbnailSize } from "../../utils"

import { Container } from "./FirebaseImage.styles"
import { ImageLoader } from "./ImageLoader"
import { ObjectViewMode } from "./ImageLoader.styles"

interface FirebaseImageProps {
  storageRef: string
  size: ThumbnailSize
  loadOffset?: number

  // Props in common with ImageLoader
  onClick?: React.MouseEventHandler<HTMLImageElement>
  mode?: ObjectViewMode
  deferLoading?: boolean
  height?: string
  width?: string
  title?: string

}

export const FirebaseImage: React.FC<FirebaseImageProps> = ({
  storageRef,
  size,
  loadOffset = 300,
  height = "100%",
  width = "100%",
  deferLoading = false,
  mode,
  onClick,
  title
}) => {
  if (!size) throw Error("FirebaseImage needs a size")

  // get all possible urls for this storageRef
  const urls = getImageUrls(storageRef)

  // TODO use srcSet to make this dynamic (this will require handling missing resolutions)
  // select url of required size
  const url = urls[size]

  const useSmallLoadingSpinner = size === "S"

  return (
    <LazyLoad
      debounce={false}
      throttle={250}
      offsetVertical={loadOffset}
      height={height}
      width={width}
    >
      <Container>
        <ImageLoader
          src={url}
          height={height}
          width={width}
          deferLoading={deferLoading}
          onClick={onClick}
          mode={mode}
          title={title}
          useSmallLoadingSpinner={useSmallLoadingSpinner}
        />
      </Container>
    </LazyLoad>
  )
}

export default FirebaseImage
