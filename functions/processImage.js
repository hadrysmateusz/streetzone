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

/**
 * Converts file to JPEG format
 * @param {string} sourceFilePath temporary local path to the downloaded source path
 * @param {string} tempWorkingPath local path where the converted path will temporarily be stored
 * @param {string} filePath path to file in cloud storage
 */
const convertFileToJPEG = async (sourceFilePath, filePath) => {
	const fileName = path.basename(filePath, path.extname(filePath))
	const fileDir = path.dirname(filePath)
	const thumbnailPath = path.normalize(
		path.format({ dir: fileDir, name: fileName, ext: JPEG_EXTENSION })
	)
	const localTempPath = path.join(os.tmpdir(), thumbnailPath)

	// Convert the image to JPEG using ImageMagick.
	await spawn("convert", [sourceFilePath, localTempPath])

	// Remove the original file
	await bucket.file(filePath).delete()

	// Upload the JPEG image (To the location of the original file)
	await bucket.upload(localTempPath, { destination: filePath })

	fs.unlinkSync(localTempPath)
}

const signedURLConfig = {
	action: "read",
	expires: "03-01-2500"
}

const generateThumbnail = async (pathFrom, pathTo, options) => {
	const { size, mode } = options

	console.log(pathFrom, pathTo)

	switch (mode) {
		case "contain":
			return spawn("convert", [pathFrom, "-thumbnail", size, pathTo], {
				capture: ["stdout", "stderr"]
			})
		case "cover":
			return spawn(
				"convert",
				[pathFrom, `-thumbnail ${size}^`, "-gravity center", `-extent ${size}`, pathTo],
				{
					capture: ["stdout", "stderr"]
				}
			)
		default:
			throw Error(`invalid processing mode (${mode})`)
	}
}

const uploadThumbnail = async (file, path) => {
	return bucket.upload(file, {
		destination: path,
		contentType: "image/jpeg",
		public: true,
		gzip: true,
		metadata: {
			cacheControl: "public, max-age=31557600"
		}
	})
}

const createThumbnail = async (filePath, sourceFilePath, postfix, thumbnailOptions) => {
	const fileName = path.basename(filePath, path.extname(filePath))
	const fileDir = path.dirname(filePath)
	const thumbnailPath = path.normalize(
		path.format({ dir: fileDir, name: fileName + postfix })
	)
	const localTempPath = path.join(os.tmpdir(), thumbnailPath)

	// generate thumbnail
	try {
		await generateThumbnail(sourceFilePath, localTempPath, thumbnailOptions)
	} catch (error) {
		console.error("[spawn] stderr: ", error.stderr)
		throw error
	}
	// upload thumbnail
	await uploadThumbnail(localTempPath, thumbnailPath)
	// remove temporary file to free up memory
	fs.unlinkSync(localTempPath)

	return thumbnailPath
}

/**
 * generates thumbnails for a given file
 * returns array of cloud storage paths for all images (thumbnails and the original image)
 */
const generateThumbnails = async (object, sizes) => {
	const filePath = object.name
	const contentType = object.contentType

	// Exit if the file is not an image
	if (!object.contentType.startsWith("image/")) {
		console.log(`Exiting because file (${filePath}) is not an image (${contentType})`)
		return null
	}

	// Exit if the file is already a thumbnail
	if (filePath.endsWith("THUMB")) {
		console.log(`Exiting because file (${filePath}) is already a thumbnail`)
		return false
	}

	// Generate temporary paths
	const sourceFilePath = path.join(os.tmpdir(), filePath)

	// Make sure temporary directories exist
	await mkdirp(path.dirname(sourceFilePath))

	// Download file from bucket
	await bucket.file(filePath).download({ destination: sourceFilePath })

	// if file is in other format, convert it to jpeg
	if (!contentType.startsWith("image/jpeg")) {
		convertFileToJPEG(sourceFilePath, filePath)
	}

	// create array that will contain promises resolving to cloud storage paths of all images
	const pathPromises = [filePath]

	// Generate thumbnails using ImageMagick
	if (sizes[2]) {
		pathPromises.push(
			createThumbnail(filePath, sourceFilePath, L_THUMB_POSTFIX, sizes[2])
		)
	}
	if (sizes[1]) {
		pathPromises.push(
			createThumbnail(filePath, sourceFilePath, M_THUMB_POSTFIX, sizes[1])
		)
	}
	if (sizes[0]) {
		pathPromises.push(
			createThumbnail(filePath, sourceFilePath, S_THUMB_POSTFIX, sizes[0])
		)
	}

	// wait for all promises to resolve
	const paths = await Promise.all(pathPromises)

	// remove the source file (only after all promises resolve)
	fs.unlinkSync(sourceFilePath)

	return paths
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
			const filePaths = await generateThumbnails(file, [
				{ size: "60x60", mode: "cover" },
				{ size: "130x130", mode: "cover" },
				{ size: "230x230", mode: "cover" }
			])
			if (filePaths) {
				const userId = file.name.split("/")[1]
				const urls = await Promise.all(
					filePaths.map((path) => bucket.file(path).getSignedUrl(signedURLConfig))
				)
				await writeUrlsToDb(userId, urls)
			}
			return
		default:
			throw Error("uploaded file to unknown bucket")
	}
}

module.exports = processImage
