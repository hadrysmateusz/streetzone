import cloneDeep from "clone-deep"
import { formatItemDataForDb, MODE, REQUIRED } from "./formatItemData"

const requiredData = {
	name: "Mock shoes",
	designers: ["Balenciaga", "Nike"],
	category: "Buty",
	price: "550",
	condition: "11.5",
	attachments: ["attachment1", "attachment2"],
	userId: "userid"
}

const optionalData = {
	size: "buty-42",
	description: "lorem ipsum dolor sit amet"
}

const fullData = {
	...requiredData,
	...optionalData
}

const expectedRequired = {
	name: "Mock shoes",
	designers: ["Balenciaga", "Nike"],
	category: "Buty",
	price: 550,
	condition: 11.5,
	attachments: ["attachment1", "attachment2"],
	userId: "userid",
	id: expect.any(String),
	isArchived: false,
	isVerified: false,
	createdAt: expect.any(Number),
	refreshedAt: expect.any(Number),
	modifiedAt: expect.any(Number),
	promotedAt: null
}

const expectedFull = {
	...expectedRequired,
	size: "buty-42",
	description: "lorem ipsum dolor sit amet"
}

test("creates item from correct data", () => {
	const formatted = formatItemDataForDb(fullData, MODE.CREATE)
	expect(formatted).toMatchObject(expectedFull)
})

test("handles optional data", () => {
	const formatted = formatItemDataForDb(requiredData, MODE.CREATE)
	expect(formatted).toMatchObject(expectedRequired)
})

test("throws if missing required data", () => {
	const data = cloneDeep(fullData)

	for (const field of REQUIRED) {
		expect(() => {
			formatItemDataForDb({ ...data, [field]: undefined }, MODE.CREATE)
		}).toThrow("missing required data")
	}
})

test("throws if invalid designers value", () => {
	const data = cloneDeep(fullData)

	data.designers = []
	expect(() => {
		formatItemDataForDb(data, MODE.CREATE)
	}).toThrow("a property expected a non-empty array")

	data.designers = "some designer"
	expect(() => {
		formatItemDataForDb(data, MODE.CREATE)
	}).toThrow("a property expected a non-empty array")
})

test("throws if invalid attachments value", () => {
	const data = cloneDeep(fullData)

	data.attachments = []
	expect(() => {
		formatItemDataForDb(data, MODE.CREATE)
	}).toThrow("a property expected a non-empty array")

	data.attachments = "some attachment"
	expect(() => {
		formatItemDataForDb(data, MODE.CREATE)
	}).toThrow("a property expected a non-empty array")
})
