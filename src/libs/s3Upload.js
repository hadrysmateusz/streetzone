import Storage from "@aws-amplify/storage"

export default async function s3Upload(file) {
	const filename = `${Date.now()}-${file.name}`

	const res = await Storage.vault.put(filename, file, {
		contentType: file.type
	})

	return res.key
}
