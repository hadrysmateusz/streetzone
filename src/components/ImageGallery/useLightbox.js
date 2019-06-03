import { useState } from "react"

import { useFirebase } from "../../hooks"

const useLightbox = (current, storageRefs) => {
	const [isOpen, setIsOpen] = useState(false)
	const [imageUrls, setImageUrls] = useState([])
	const firebase = useFirebase()

	const nOfElements = storageRefs.length

	const mainSrc = imageUrls[current] || undefined
	const nextSrc = imageUrls[(current + 1) % nOfElements] || undefined
	const prevSrc = imageUrls[(current + nOfElements - 1) % nOfElements] || undefined

	const open = async () => {
		const _imageUrls = await firebase.batchGetImageURLs(storageRefs)
		setImageUrls(_imageUrls)
		setIsOpen(true)
	}

	const close = () => setIsOpen(false)

	const lightboxProps = {
		mainSrc,
		nextSrc,
		prevSrc,
		onCloseRequest: close
	}

	return { isLightboxOpen: isOpen, openLightbox: open, lightboxProps }
}

export default useLightbox
