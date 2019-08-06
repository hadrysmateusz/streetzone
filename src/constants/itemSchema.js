import categories from "./itemCategories"
import sizes from "./sizes"

// options for react-select
const categoryOptions = Object.values(categories).map((categoryName) => ({
	value: categoryName,
	label: categoryName
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

const sizeOptions = (category) => {
	if (category === categories.buty) {
		return sizes.shoes.map((size) => ({
			value: `shoes-${size}`,
			label: size
		}))
	}

	if (category === categories.akcesoria) {
		return sizes.accessories.map((size) => ({
			value: `accessories-${size}`,
			label: size === "OS" ? "One Size" : size
		}))
	}

	return sizes.clothes.map((size) => ({
		value: `clothes-${size}`,
		label: size
	}))
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
	categoryOptions,
	conditionOptions,
	sizeOptions,
	translateCondition,
	sizes
}
