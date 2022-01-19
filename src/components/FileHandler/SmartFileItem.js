import React, { useState, useEffect, useCallback } from "react"
import { nanoid } from "nanoid"

import FileItem from "./FileItem"
import { useFirebase, useFlash } from "../../hooks"

const SmartFileItem = ({
  onUpload,
  onDelete,
  onSetMain,
  isMain,
  id,
  error,
  data,
  uploadPath,
  previewUrl,
}) => {
  const [progress, setProgress] = useState()
  const [_error, setError] = useState()
  const firebase = useFirebase()
  const flashMessage = useFlash()

  // TODO: if the component gets unmounted without submitting the image doesn't get removed
  const upload = useCallback(async () => {
    const name = nanoid()
    const uploadTask = firebase.file(`${uploadPath}/${name}`).put(data)

    const unsubscribe = uploadTask.on(
      "state_changed",
      function (snap) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const __progress = (snap.bytesTransferred / snap.totalBytes) * 100
        const __progressInteger = Math.floor(__progress)
        setProgress(__progressInteger)
      },
      function (err) {
        // Handle unsuccessful uploads

        setError(err)
      },
      async function () {
        // Handle successful uploads on complete

        // get storage ref
        const storageRef = uploadTask.snapshot.ref.fullPath

        // get image url and set it as imageUrl
        const imageUrl = await firebase.getImageURL(storageRef)

        onUpload(id, storageRef, imageUrl)
      }
    )

    // return cleanup function
    return () => {
      unsubscribe()
      uploadTask.cancel()
    }
  }, [data, firebase, id, onUpload, uploadPath])

  const onCopyLinkToClipboard = async (id) => {
    if ("clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(previewUrl)
        flashMessage({ type: "success", text: "Link skopiowano do schowka" })
      } catch (err) {
        if ("permissions" in navigator) {
          await navigator.permissions.query({ name: "clipboard" })
        } else {
          flashMessage({
            type: "error",
            text: "Permission API isn't supported",
            details: `You can copy the link manually: ${previewUrl}`,
          })
        }
      }
    } else {
      flashMessage({
        type: "error",
        text: "Clipboard API isn't supported",
        details: `You can copy the link manually: ${previewUrl}`,
      })
    }
  }

  useEffect(() => {
    upload()

    // TODO: remove item from storage to prevent stranded files
  }, [upload])

  return (
    <FileItem
      isMain={isMain}
      id={id}
      error={_error ? _error : error}
      previewUrl={previewUrl}
      uploadProgress={progress}
      actions={[
        {
          label: "Usuń",
          handler: onDelete,
          icon: "trash",
        },
        {
          label: "Główne",
          handler: onSetMain,
          icon: ["far", "star"],
        },
        {
          label: "Link",
          handler: onCopyLinkToClipboard,
          icon: "clipboard",
        },
      ]}
    />
  )
}

export default SmartFileItem
