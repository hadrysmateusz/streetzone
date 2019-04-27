import shortid from "shortid"

export default class CustomFile {
	constructor(params) {
		this.id = shortid.generate()
		this.storageRef = params.storageRef || ""
		this.previewUrl = params.previewUrl || ""
		this.data = params.data || {}
		this.isUploaded = params.isUploaded || false
		this.isMain = params.isMain || false
	}
}
