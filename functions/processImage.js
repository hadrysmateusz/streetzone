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
	L_THUMB_POSTFIX
} = require("./const")

const signedURLConfig = {
	action: "read",
	expires: "03-01-2500"
}

const generateThumbnail = ({ size, mode }, pathFrom, pathTo) => {
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

const generateThumbnails = async (object, sizes) => {
	const filePath = object.name

	if (filePath.endsWith("THUMB")) {
		console.log("File is already a thumbnail")
		return false
	}

	const baseFileName = path.basename(filePath, path.extname(filePath))
	const fileDir = path.dirname(filePath)
	const tempLocalFile = path.join(os.tmpdir(), filePath)
	const tempLocalDir = path.dirname(tempLocalFile)

	// Temp JPEG
	const JPEGFilePath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION })
	)
	let tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath)

	// Temp Small Thumbnail
	const thumbSPath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName + S_THUMB_POSTFIX })
	)
	const tempLocalThumbSFile = path.join(os.tmpdir(), thumbSPath)

	// Temp Medium Thumbnail
	const thumbMPath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName + M_THUMB_POSTFIX })
	)
	const tempLocalThumbMFile = path.join(os.tmpdir(), thumbMPath)

	// Temp Large Thumbnail
	const thumbLPath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName + L_THUMB_POSTFIX })
	)
	const tempLocalThumbLFile = path.join(os.tmpdir(), thumbLPath)

	// Exit if this is triggered on a file that is not an image.
	if (!object.contentType.startsWith("image/")) {
		console.log(`This file is not an image (${object.contentType}`)
		return null
	}

	// Create the temp directory where the storage file will be downloaded
	await mkdirp(tempLocalDir)

	// Download file from bucket
	await bucket.file(filePath).download({ destination: tempLocalFile })

	// Only convert files that aren't already a JPEG
	if (!object.contentType.startsWith("image/jpeg")) {
		// Convert the image to JPEG using ImageMagick.
		await spawn("convert", [tempLocalFile, tempLocalJPEGFile])

		// Remove the original file
		await bucket.file(filePath).delete()

		// Upload the JPEG image (To the location of the original file)
		await bucket.upload(tempLocalJPEGFile, { destination: filePath })
	} else {
		// If the file is already a jpeg point the JPEGFile to its location
		tempLocalJPEGFile = tempLocalFile
	}

	// Generate thumbnails using ImageMagick
	await generateThumbnail(sizes[0], tempLocalJPEGFile, tempLocalThumbSFile)
	await generateThumbnail(sizes[1], tempLocalJPEGFile, tempLocalThumbMFile)
	await generateThumbnail(sizes[2], tempLocalJPEGFile, tempLocalThumbLFile)

	// Upload the thumbnails
	const signedURLs = await Promise.all([
		bucket.file(filePath).getSignedUrl(signedURLConfig),
		uploadThumbnail(tempLocalThumbSFile, thumbSPath),
		uploadThumbnail(tempLocalThumbMFile, thumbMPath),
		uploadThumbnail(tempLocalThumbLFile, thumbLPath)
	])

	// Once the image has been converted delete the local files to free up disk space.
	// "tempLocalFile" is not unlinked as the "tempLocalJPEGFile" is saved to that same location
	fs.unlinkSync(tempLocalJPEGFile)
	fs.unlinkSync(tempLocalThumbSFile)
	fs.unlinkSync(tempLocalThumbMFile)
	fs.unlinkSync(tempLocalThumbLFile)

	return signedURLs
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

const processImage = async (file) => {
	// "attachments/" actually includes many other storage directories because they are named like "something-attachments/"
	if (file.name.includes("attachments/")) {
		console.log("Processing an attachment...")
		return await generateThumbnails(file, [
			{ size: "110x110", mode: "contain" },
			{ size: "350x350", mode: "contain" },
			{ size: "770x770", mode: "contain" }
		])
	} else if (file.name.includes("profile-pictures/")) {
		console.log("Processing a profile picture...")
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
	}
}

module.exports = processImage
