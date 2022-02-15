import { CustomFile } from "./CustomFile"
import { Firebase } from "../Firebase"

// TODO: consider throwing when index is -1 (not found)
export function getMainImageIndex(files: CustomFile[]) {
  return files.findIndex((a) => a.isMain)
}

export function getAttachmentRefFromCustomFile(firebase: Firebase) {
  /**
   * If file object already has a storageRef (which means it's already been uploaded) return that,
   * if not, upload the file to firebase storage, to the specified bucket and return the new ref
   * @returns firebase storage ref corresponding to the file
   */
  return async function (bucket: string, file: CustomFile) {
    // If file already has a ref, return it
    if (file.storageRef) return file.storageRef as string

    // Upload the new file and return promise containing ref
    const snapshot = await firebase.uploadFile(bucket, file.data)

    return snapshot.ref.fullPath as string
  }
}

export function batchGetAttachmentRefFromCustomFile(firebase: Firebase) {
  /**
   * Batch version of 'getAttachmentRefFromCustomFile'
   * @returns firebase storage refs corresponding to the files
   */
  return async function (bucket: string, files: CustomFile[]) {
    return await Promise.all(
      files.map((file) =>
        getAttachmentRefFromCustomFile(firebase)(bucket, file)
      )
    )
  }
}
