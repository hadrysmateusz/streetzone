import React, { useState } from "react"

import LoadingSpinner from "../LoadingSpinner"

import {
  ErrorIcon,
  Image,
  LoaderContainer,
  ObjectViewMode,
} from "./ImageLoader.styles"

interface ImageLoaderProps {
  src: string
  alt?: string
  useSmallLoadingSpinner?: boolean

  onClick?: React.MouseEventHandler<HTMLImageElement>
  mode?: ObjectViewMode
  deferLoading?: boolean
  height?: string
  width?: string
  title?: string

}

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  onClick,
  src,
  mode = "cover",
  deferLoading = false,
  title,
  useSmallLoadingSpinner,
  width,
  height,
  alt,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onError = () => {
    setError("Unknown error")
  }

  const onLoad = () => {
    setIsLoaded(true)
  }

  // TODO: rework this when using srcSet
  // only defer loading if the flag is supplied and the image isn't already loaded
  const isLoadingDeferred = deferLoading && !isLoaded

  return error ? (
    <ErrorIcon />
  ) : (
    <>
      {!isLoadingDeferred && (
        <Image
          src={src}
          onClick={onClick}
          onLoad={onLoad}
          onError={onError}
          mode={mode}
          title={title}
          alt={alt}
          width={width}
          height={height}
        />
      )}
      {!isLoaded && (
        <LoaderContainer>
          <LoadingSpinner
            delay={400}
            color="var(--gray100)"
            size={useSmallLoadingSpinner ? 4 : 9}
          />
        </LoaderContainer>
      )}
    </>
  )
}
