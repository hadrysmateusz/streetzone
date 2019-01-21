// Data to be passed to final-form
export const formatItemDataForForm = (data) => ({
	name: data.name,
	designers: data.designers,
	price: data.price,
	category: data.category,
	size: data.size,
	description: data.description,
	files: data.files
})

// Data to be passed to the database
export const dbData = (data, time, userId, attachments) => {
	let formattedData = {
		name: data.name,
		designers: data.designers,
		price: Number.parseInt(data.price),
		category: data.category,
		size: data.size,
		description: data.description,
		condition: data.condition,
		userId,
		attachments
	}

	if (time.createdAt) {
		formattedData.createdAt = time.createdAt
	}

	if (time.modifiedAt) {
		formattedData.modifiedAt = time.modifiedAt
	}

	return formattedData
}
