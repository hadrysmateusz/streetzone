const { bucket } = require("./firebaseConfig")
const { S_THUMB_POSTFIX, M_THUMB_POSTFIX, L_THUMB_POSTFIX } = require("./const")

const removeImagesOfItem = async (snap) => {
	const data = snap.data()

	const removeFile = async (name) => {
		try {
			const t = Date.now()
			await bucket.file(name).delete()
			console.log(`Deleted ${name} in ${Date.now() - t}ms`)
		} catch (err) {
			console.error(
				`There was a problem with deleting ${name} it might not have been deleted`,
				err
			)
		}
	}

	return Promise.all(
		data.attachments.map(async (ref) => {
			await removeFile(ref)
			await removeFile(ref + S_THUMB_POSTFIX)
			await removeFile(ref + M_THUMB_POSTFIX)
			await removeFile(ref + L_THUMB_POSTFIX)
		})
	)
}

module.exports = removeImagesOfItem
