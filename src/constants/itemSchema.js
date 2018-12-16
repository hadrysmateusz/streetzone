const schema = {
	designers: [
		"Adidas",
		"Gucci",
		"Givenchy",
		"Nike",
		"Off-White",
		"Supreme",
		"Converse",
		"Louis Vuitton",
		"Acne Studios",
		"Balenciaga",
		"Balmain",
		"Dior",
		"Prada"
	],
	categories: ["Buty", "Tee", "Longsleeve", "Akcesoria", "Spodnie"]
}

// options for react-select
const categoryOptions = schema.categories.map((categoryName, i) => ({
	value: categoryName,
	label: categoryName
}))
const designerOptions = schema.designers.map((designerName, i) => ({
	value: designerName,
	label: designerName
}))

export { schema, categoryOptions, designerOptions }
