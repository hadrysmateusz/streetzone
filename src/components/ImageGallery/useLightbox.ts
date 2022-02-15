import { useCallback, useMemo, useState } from "react"

import { useFirebase } from "../../hooks"

const useLightbox = (current: number, storageRefs: string[]) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const firebase = useFirebase()

  const nOfElements = storageRefs.length

  // TODO: make sure mainSrc is always a valid string
  const mainSrc = imageUrls[current]
  const nextSrc = imageUrls[(current + 1) % nOfElements] || undefined
  const prevSrc =
    imageUrls[(current + nOfElements - 1) % nOfElements] || undefined

  const open = useCallback(async () => {
    const _imageUrls = await firebase.batchGetImageURLs(storageRefs)
    setImageUrls(_imageUrls)
    setIsOpen(true)
  }, [firebase, storageRefs])

  const close = useCallback(() => setIsOpen(false), [])

  const lightboxProps = useMemo(
    () => ({
      mainSrc,
      nextSrc,
      prevSrc,
      onCloseRequest: close,
    }),
    [close, mainSrc, nextSrc, prevSrc]
  )

  return useMemo(
    () => ({ isLightboxOpen: isOpen, openLightbox: open, lightboxProps }),
    [isOpen, lightboxProps, open]
  )
}

export default useLightbox
