import { nanoid } from "nanoid"

export default class CustomFile {
  constructor(params) {
    this.id = nanoid()
    this.storageRef = params.storageRef || ""
    this.previewUrl = params.previewUrl || ""
    this.data = params.data || {}
    this.isUploaded = params.isUploaded || false
    this.isMain = params.isMain || false
  }
}
