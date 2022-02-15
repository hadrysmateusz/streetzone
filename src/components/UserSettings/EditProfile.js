import { useState, useEffect } from "react"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { CONST } from "../../constants"

import LoadingSpinner from "../LoadingSpinner"
import { CustomFile } from "../FileHandler"
import ErrorBox from "../ErrorBox"

import { ProfileEditForm } from "./ProfileEditForm"

const EditProfile = () => {
  const authUser = useAuthentication()
  const firebase = useFirebase()
  const flashMessage = useFlash()
  const [initialValues, setInitialValues] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // get all the basic values
    let initialValues = {
      name: authUser.name,
      email: authUser.email,
      city: authUser.city,
      phone: authUser.phone,
      info: authUser.info,
      messengerLink: authUser.messengerLink,
    }

    // get the profile picture and create CustomFile
    if (authUser.profilePictureURLs && authUser.profilePictureURLs.length > 0) {
      const file = new CustomFile({
        storageRef: authUser.profilePictureRef || null,
        previewUrl: getProfilePictureURL(authUser, "L"),
        isUploaded: true,
      })
      initialValues.file = file
    }

    // set initialValues for the form
    setInitialValues(initialValues)
  }, [authUser])

  const getNewImageInfo = async (file) => {
    // if there is no file, empty the fields
    if (!file) {
      return {
        profilePictureRef: null,
        profilePictureURLs: null,
      }
    }

    // if the file hsn't changed, don't make changes
    if (file.isUploaded) return {}

    // upload the new file
    const snapshot = await firebase.uploadFile(
      `${CONST.STORAGE_BUCKET_PROFILE_PICTURES}/${authUser.uid}`,
      file.data
    )

    // get the new ref and temporary url
    const newFileRef = snapshot.ref.fullPath
    const newUrl_temp = await firebase.getImageURL(newFileRef)

    return { profilePictureRef: newFileRef, profilePictureURLs: [newUrl_temp] }
  }

  const onSubmit = async (values) => {
    try {
      // Get ref of current profile picture
      const oldFileRef = authUser.profilePictureRef || null

      // Get the values of profile picture related fields
      const newImageInfo = await getNewImageInfo(values.file)

      // Format the data for database
      const data = {
        name: values.name || initialValues.name || null,
        city: values.city || null,
        phone: values.phone || null,
        info: values.info || null,
        messengerLink: values.messengerLink || null,
        ...newImageInfo,
      }

      // Update the user with the new data
      await firebase.user(authUser.uid).update(data)

      // Remove old file if it's different from the new one
      if (oldFileRef && oldFileRef !== data.profilePictureRef) {
        await firebase.file(oldFileRef).delete()
      }

      flashMessage({ type: "success", text: "Zmiany zostały zapisane" })
    } catch (err) {
      flashMessage({
        type: "error",
        text: "Wystąpił błąd, zmiany mogły nie zostać zapisane",
      })
      setError("Wystąpił błąd, zmiany mogły nie zostać zapisane")
    }
  }

  const isLoading = !initialValues

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <ProfileEditForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        onCancel={() => setError(null)}
      />
      <ErrorBox error={error} />
    </>
  )
}

export default EditProfile
