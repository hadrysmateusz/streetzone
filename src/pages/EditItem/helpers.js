export function formatDataForEditForm(price, condition, description, files) {
  return {
    price: Number.parseInt(price),
    description: description || "",
    condition,
    files: files,
  }
}
