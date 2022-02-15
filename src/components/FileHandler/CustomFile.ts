import { nanoid } from "nanoid"

interface ICustomFile {
  id: string
  storageRef: string
  previewUrl: string
  data: any // TODO: better type
  isUploaded: boolean
  isMain: boolean
}

export class CustomFile implements ICustomFile {
  id
  storageRef
  previewUrl
  data
  isUploaded
  isMain

  constructor(params: Omit<ICustomFile, "id">) {
    this.id = nanoid()
    this.storageRef = params.storageRef ?? ""
    this.previewUrl = params.previewUrl ?? ""
    this.data = params.data ?? {}
    this.isUploaded = params.isUploaded ?? false
    this.isMain = params.isMain ?? false
  }
}

export default CustomFile
