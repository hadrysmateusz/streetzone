const schema = {
	title: { type: "string", label: "Tytuł" },
	description: { type: "longString", label: "Opis", info: "Gdzie, jak, ile itd." },
	value: {
		type: "string",
		label: "Wartość",
		info: 'Razem z walutą lub znakami "-" i "%"'
	},
	link: {
		type: "string",
		label: "Link",
		info: "Affiliate lub zwykły link do strony promocji"
	},
	image: { type: "image", label: "Zdjęcie", path: "deal-attachments" },
	meta: ["id", "createdAt", "editedAt"]
}

const redirectRoute = "ADMIN_DEALS"

export default schema
