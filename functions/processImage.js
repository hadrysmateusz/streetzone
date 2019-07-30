const mkdirp = require("mkdirp-promise")
const spawn = require("child-process-promise").spawn
const path = require("path")
const os = require("os")
const fs = require("fs")

const { db, bucket } = require("./firebaseConfig")

const {
	JPEG_EXTENSION,
	S_THUMB_POSTFIX,
	M_THUMB_POSTFIX,
	L_THUMB_POSTFIX,
	STORAGE_BUCKET_BLOG_ATTACHMENTS,
	STORAGE_BUCKET_DROP_ATTACHMENTS,
	STORAGE_BUCKET_DEAL_ATTACHMENTS,
	STORAGE_BUCKET_ITEM_ATTACHMENTS,
	STORAGE_BUCKET_PROFILE_PICTURES
} = require("./const")

const signedURLConfig = {
	action: "read",
	expires: "03-01-2500"
}

const generateThumbnail = ({ size, mode }, pathFrom, pathTo) => {
	console.log(pathFrom, pathTo)

	if (mode === "cover") {
		return spawn(
			"convert",
			[pathFrom, "-thumbnail", size + "^", "-gravity", "center", "-extent", size, pathTo],
			{
				capture: ["stdout", "stderr"]
			}
		)
	} else if (mode === "contain") {
		return spawn("convert", [pathFrom, "-thumbnail", size, pathTo], {
			capture: ["stdout", "stderr"]
		})
	}
}

const uploadThumbnail = async (file, path) => {
	await bucket.upload(file, {
		destination: path,
		contentType: "image/jpeg",
		public: true,
		gzip: true,
		metadata: {
			cacheControl: "public, max-age=31557600"
		}
	})
	return bucket.file(path).getSignedUrl(signedURLConfig)
}

const downloadFile = async (filePath) => {
	const tempLocalFile = path.join(os.tmpdir(), filePath)
	const tempLocalDir = path.dirname(tempLocalFile)

	// Create the temp directory where the storage file will be downloaded
	await mkdirp(tempLocalDir)

	// Download file from bucket
	await bucket.file(filePath).download({ destination: tempLocalFile })

	return tempLocalFile
}

const generateThumbnailPath = (sourceFilePath, postfix = "") => {
	const baseFileName = path.basename(sourceFilePath, path.extname(sourceFilePath))
	const fileDir = path.dirname(sourceFilePath)

	const thumbnailPath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName + postfix })
	)

	return thumbnailPath
}

const convertFileToJPEG = async (sourceFile, sourceFilePath) => {
	const sourceFileName = path.basename(sourceFilePath, path.extname(sourceFilePath))
	const sourceFileDir = path.dirname(sourceFilePath)
	const tempFilePath = path.normalize(
		path.format({ dir: sourceFileDir, name: sourceFileName, ext: JPEG_EXTENSION })
	)
	let tempFile = path.join(os.tmpdir(), tempFilePath)

	// Convert the image to JPEG using ImageMagick.
	await spawn("convert", [sourceFile, tempFile])

	// Remove the original file
	await bucket.file(sourceFilePath).delete()

	// Upload the JPEG image (To the location of the original file)
	await bucket.upload(tempFile, { destination: sourceFilePath })
}

const generateThumbnails = async (object, sizes) => {
	const filePath = object.name
	const contentType = object.contentType

	// Exit if the file is not an image
	if (!object.contentType.startsWith("image/")) {
		console.log(`This file is not an image (${object.contentType}`)
		return null
	}

	// Exit if the file is already a thumbnail
	if (filePath.endsWith("THUMB")) {
		console.log("File is already a thumbnail")
		return false
	}

	// download file from storage bucket to local (on server) storage
	const tempLocalFile = await downloadFile(filePath)

	// if file is in other format, convert it to jpeg
	if (!contentType.startsWith("image/jpeg")) {
		convertFileToJPEG(tempLocalFile, filePath)
	}

	const signedUrls = []

	signedUrls.push(bucket.file(filePath).getSignedUrl(signedURLConfig))

	console.log("sizes: ", sizes)

	// Generate thumbnails using ImageMagick
	if (sizes[0]) {
		const thumbnailPath = generateThumbnailPath(filePath, S_THUMB_POSTFIX)
		const thumbnailFile = path.join(os.tmpdir(), thumbnailPath)
		await generateThumbnail(sizes[0], tempLocalFile, thumbnailFile)
		const signedUrl = await uploadThumbnail(thumbnailFile, thumbnailPath)
		signedUrls.push(signedUrl)
		fs.unlinkSync(thumbnailFile)
	}
	if (sizes[1]) {
		const thumbnailPath = generateThumbnailPath(filePath, M_THUMB_POSTFIX)
		const thumbnailFile = path.join(os.tmpdir(), thumbnailPath)
		await generateThumbnail(sizes[1], tempLocalFile, thumbnailFile)
		const signedUrl = await uploadThumbnail(thumbnailFile, thumbnailPath)
		signedUrls.push(signedUrl)
		fs.unlinkSync(thumbnailFile)
	}
	if (sizes[2]) {
		const thumbnailPath = generateThumbnailPath(filePath, L_THUMB_POSTFIX)
		const thumbnailFile = path.join(os.tmpdir(), thumbnailPath)
		await generateThumbnail(sizes[2], tempLocalFile, thumbnailFile)
		const signedUrl = await uploadThumbnail(thumbnailFile, thumbnailPath)
		signedUrls.push(signedUrl)
		fs.unlinkSync(thumbnailFile)
	}

	return signedUrls
}

const writeUrlsToDb = async (userId, urls) => {
	const profilePictureURLs = urls.map((result, i) => {
		console.log(`url ${i}:`, result)
		return result[0]
	})

	// Add the URLs to the Database
	return db
		.collection("users")
		.doc(userId)
		.update({ profilePictureURLs })
}

const getStorageBucketName = (file) => {
	const fileName = file.name
	const firebaseBucket = fileName.slice(0, fileName.indexOf("/"))

	console.log("fileName: ", fileName)
	console.log("firebaseBucket: ", firebaseBucket)

	return firebaseBucket
}

const processImage = async (file) => {
	const firebaseBucket = getStorageBucketName(file)

	switch (firebaseBucket) {
		case STORAGE_BUCKET_BLOG_ATTACHMENTS:
			return await generateThumbnails(file, [
				null,
				{ size: "350x350", mode: "contain" },
				{ size: "700x700", mode: "contain" }
			])
		case STORAGE_BUCKET_DROP_ATTACHMENTS:
			return await generateThumbnails(file, [
				null,
				{ size: "420x290", mode: "contain" },
				{ size: "760x500", mode: "contain" }
			])
		case STORAGE_BUCKET_DEAL_ATTACHMENTS:
			return await generateThumbnails(file, [
				null,
				{ size: "420x290", mode: "contain" },
				{ size: "760x500", mode: "contain" }
			])
		case STORAGE_BUCKET_ITEM_ATTACHMENTS:
			return await generateThumbnails(file, [
				{ size: "90x90", mode: "contain" },
				{ size: "260x260", mode: "contain" },
				{ size: "760x500", mode: "contain" }
			])
		case STORAGE_BUCKET_PROFILE_PICTURES:
			const urls = await generateThumbnails(file, [
				{ size: "60x60", mode: "cover" },
				{ size: "130x130", mode: "cover" },
				{ size: "230x230", mode: "cover" }
			])
			if (urls) {
				const userId = file.name.split("/")[1]
				await writeUrlsToDb(userId, urls)
			}
			return
		default:
			throw Error("uploaded file to unknown bucket")
	}
}

module.exports = processImage
