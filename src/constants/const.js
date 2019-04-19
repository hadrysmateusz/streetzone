export const BRAND_NAME = "Bumbped"
export const CONTACT_EMAIL = "kugot999@gmail.com"
export const ATTACHMENTS_MAX_COUNT = 9
export const ATTACHMENTS_MAX_SIZE = 5242880
export const DESC_MAX_CHARACTERS = 500
export const ACCOUNT_DESC_MAX_CHARACTERS = 200
export const COMMENT_MAX_CHARACTERS = 400
export const ITEM_DESC_PLACEHOLDER =
	"Oryginalna cena, możliwości wysyłki, informacje o uszkodzeniach itd."
export const S_THUMB_POSTFIX = "_S_THUMB"
export const M_THUMB_POSTFIX = "_M_THUMB"
export const L_THUMB_POSTFIX = "_L_THUMB"

// ===============================================================================
// !!! REMEMBER TO ALSO CHANGE IN THE CLOUD FUNCTIONS DIRECTORY !!!
const isProd = process.env.NODE_ENV === "production"
export const ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX = isProd ? "prod_items" : "dev_items"
export const ITEMS_MARKETPLACE_PRICE_ASC_ALGOLIA_INDEX = isProd
	? "prod_items_price_asc"
	: "dev_items_price_asc"
export const ITEMS_CUSTOM_ALGOLIA_INDEX = isProd ? "prod_custom" : "dev_custom"
export const BLOG_ALGOLIA_INDEX = isProd ? "prod_posts" : "dev_posts"
export const DESIGNERS_ALGOLIA_INDEX = isProd ? "prod_designers" : "dev_designers"
// ===============================================================================
