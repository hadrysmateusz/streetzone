export default (dev, prod) => {
	process.env.NODE_ENV === "development" ? console.log(dev) : console.log(prod)
}
