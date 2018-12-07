// Data to be passed to final-form
export const formData = (data) => ({
	name: data.name,
	designers: data.designers,
	price: data.price,
	category: data.category,
	size: data.size,
	description: data.description,
	files: data.files
})

// Data to be passed to the database
export const dbData = (data, userId, attachments) => ({
	name: data.name,
	designers: data.designers,
	price: Number.parseInt(data.price),
	category: data.category,
	size: data.size,
	description: data.description,
	createdAt: Date.now(),
	userId,
	attachments
})