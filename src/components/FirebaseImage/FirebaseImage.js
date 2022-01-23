import LazyLoad from "react-lazy-load"

import { getImageUrls } from "../../utils"

import { Container } from "./FirebaseImage.styles"
import { ImageLoader } from "./ImageLoader"

export const FirebaseImage = ({
  storageRef,
  size,
  loadOffset = 300,
  height = "100%",
  width = "100%",
  ...rest
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
        <ImageLoader src={url} {...rest} useSmallLoadingSpinner={useSmallLoadingSpinner} />
      </Container>
    </LazyLoad>
  )
}

export default FirebaseImage
