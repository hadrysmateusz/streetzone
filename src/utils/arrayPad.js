const arrayPad = (array, length, fillWith) => {
	const secondArrLen = Math.max(0, length - array.length)
	const newArray = [...array].concat(Array(secondArrLen).fill(fillWith))
	return newArray
}

export default arrayPad
