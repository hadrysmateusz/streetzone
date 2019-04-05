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

const status = {
	available: "AVAILABLE",
	sold: "SOLD"
}

// options for react-select
const categoryOptions = Object.values(categories).map((categoryName) => ({
	value: categoryName,
	label: categoryName
}))

const designerOptions = designers.map((designerName) => ({
	value: designerName,
	label: designerName
}))

const conditionOptions = [
	{
		value: 11,
		label: "DS"
	},
	{
		value: 10,
		label: "VNDS"
	},
	{
		value: 9.5,
		label: "9.5"
	},
	{
		value: 9,
		label: "9"
	},
	{
		value: 8.5,
		label: "8.5"
	},
	{
		value: 8,
		label: "8"
	},
	{
		value: 7.5,
		label: "7.5"
	},
	{
		value: 7,
		label: "7"
	},
	{
		value: 6.5,
		label: "6.5"
	},
	{
		value: 6,
		label: "6"
	},
	{
		value: 5.5,
		label: "5.5"
	},
	{
		value: 5,
		label: "5"
	}
]

const size = {
	top: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
	buty: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
	spodnie: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44]
}

const sizeOptions = (category) => {
	switch (category) {
		case categories.tee:
		case categories.longsleeve:
			return size.top.map((size) => ({
				value: `top-${size}`,
				label: size
			}))
		case categories.buty:
			return size.buty.map((size) => ({
				value: `buty-${size}`,
				label: size
			}))
		case categories.spodnie:
			return size.spodnie.map((size) => ({
				value: `spodnie-${size}`,
				label: size
			}))
		default:
			return []
	}
}

const translateCondition = (conditionValue) => {
	if (conditionValue === 11) {
		return {
			displayValue: "DS",
			tooltip: "Nowe - nie używane, w oryginalnym opakowaniu (Deadstock)"
		}
	} else if (conditionValue === 10) {
		return {
			displayValue: "VNDS",
			tooltip: "Prawie nowe - bez śladów użytkowania (Very Near Deadstock)"
		}
	} else if (conditionValue < 10 && conditionValue >= 0) {
		return {
			displayValue: `${conditionValue}/10`,
			tooltip: `${conditionValue}/10`
		}
	} else {
		return {}
	}
}

export {
	categories,
	designers,
	categoryOptions,
	designerOptions,
	conditionOptions,
	sizeOptions,
	translateCondition,
	status,
	size
}
