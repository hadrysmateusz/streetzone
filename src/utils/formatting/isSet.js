export default (val) => {
	if (val === null) return false
	if (val === undefined) return false
	if (val === "") return false
	return true
}
