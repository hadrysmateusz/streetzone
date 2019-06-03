export default (designers) =>
	designers && Array.isArray(designers) ? designers.join(" X ") : "--"
