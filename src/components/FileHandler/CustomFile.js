export default class CustomFile {
	static nextId = 0
	constructor(params) {
		this.id = CustomFile.nextId++
		this.ref = params.ref || ""
		this.previewUrl = params.previewUrl || ""
		this.data = params.data || {}
		this.isUploaded = params.isUploaded || false
	}
}
