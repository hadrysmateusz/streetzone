export const POST_CATEGORIES = {
  SNEAKERS: "Sneakers",
  STREETWEAR: "Streetwear",
  REVIEW: "Recenzje",
  EVENT: "Wydarzenia",
  VIDEO: "Video",
  TECH: "Technologicznie",
} as const

export type PostCategoryKeys = keyof typeof POST_CATEGORIES
export type PostCategoryValues = typeof POST_CATEGORIES[PostCategoryKeys]

export default POST_CATEGORIES

// New categories are supposed to look like this:
// - Poradniki
// - Wydarzenia
// - Recenzje
// - Streetwear
