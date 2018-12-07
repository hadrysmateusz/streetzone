export default async function benchmark(fn, ...params) {
	let start = Date.now()
	await fn(...params)
	let end = Date.now()
	console.log(`Execution took: ${end - start}`)
}
