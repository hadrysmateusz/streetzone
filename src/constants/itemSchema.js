// WARNING: schema is deprecated
// use individual designers and categories objects instead
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

const categories = {
	buty: "Buty",
	tee: "Tee",
	longsleeve: "Longsleeve",
	spodnie: "Spodnie",
	akcesoria: "Akcesoria"
}

// TODO: move designers to database
const designers = [
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
]

// options for react-select
const categoryOptions = schema.categories.map((categoryName) => ({
	value: categoryName,
	label: categoryName
}))

const designerOptions = schema.designers.map((designerName) => ({
	value: designerName,
	label: designerName
}))

const conditionOptions = [
	{
		value: 12,
		label: "DS"
	},
	{
		value: 11,
		label: "VNDS"
	},
	{
		value: 10,
		label: "10/10"
	},
	{
		value: 9,
		label: "9/10"
	},
	{
		value: 8,
		label: "8/10"
	},
	{
		value: 7,
		label: "7/10"
	},
	{
		value: 6,
		label: "6/10"
	},
	{
		value: 5,
		label: "5/10"
	},
	{
		value: 4,
		label: "4/10"
	},
	{
		value: 3,
		label: "3/10"
	},
	{
		value: 2,
		label: "2/10"
	},
	{
		value: 1,
		label: "1/10"
	},
	{
		value: 0,
		label: "0/10"
	}
]

const sizeOptions = (category) => {
	if ([categories.tee, categories.longsleeve].includes(category)) {
		return ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"].map((size) => ({
			value: size,
			label: size
		}))
	} else if (category === categories.buty) {
		return [
			32,
			33,
			34,
			35,
			36,
			37,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			46,
			47,
			48,
			49,
			50,
			51
		].map((size) => ({
			value: size,
			label: size
		}))
	} else if (category === categories.spodnie) {
		return [
			26,
			27,
			28,
			29,
			30,
			31,
			32,
			33,
			34,
			35,
			36,
			37,
			38,
			39,
			40,
			41,
			42,
			43,
			44
		].map((size) => ({
			value: size,
			label: size
		}))
	} else {
		return []
	}
}

export {
	schema,
	categories,
	designers,
	categoryOptions,
	designerOptions,
	conditionOptions,
	sizeOptions
}
