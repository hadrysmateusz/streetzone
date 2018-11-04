export default class FileItem {
	static nextId = 0
	constructor(params) {
		this.id = FileItem.nextId++
		this.fileKey = params.fileKey || ""
		this.previewUrl = params.previewUrl || ""
		this.data = params.data || {}
	}
}
