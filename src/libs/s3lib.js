import Storage from "@aws-amplify/storage"
import errorLog from "./errorLog"

export async function s3Upload(file) {
	try {
		const filename = `${Date.now()}-${file.name}`

		const res = await Storage.vault.put(filename, file, {
			contentType: file.type
		})

		return res.key
	} catch (e) {
		errorLog(e, "Error while uploading file")
	}
}

export async function s3Get(fileKey, userId) {
	try {
		const url = await Storage.get(fileKey, { identityId: userId })
		return url
	} catch (e) {
		errorLog(e, "Error while getting file")
	}
}
