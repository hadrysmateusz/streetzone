export const BRAND_NAME = "StreetZone"
export const CONTACT_EMAIL = "kontakt@streetzone.pl"

export const MIN_PASSWORD_LENGTH = 8
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

export const STORAGE_BUCKET_BLOG_ATTACHMENTS = "blog-attachments"
export const STORAGE_BUCKET_DROP_ATTACHMENTS = "drop-attachments"
export const STORAGE_BUCKET_DEAL_ATTACHMENTS = "deal-attachments"
export const STORAGE_BUCKET_ITEM_ATTACHMENTS = "attachments"

// eslint-disable-next-line
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

console.log("ENV:", process.env)

// ===============================================================================
// !!! REMEMBER TO ALSO CHANGE IN THE CLOUD FUNCTIONS DIRECTORY !!!
const env = process.env.REACT_APP_ENV
export const ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX = `${env}_items`
export const ITEMS_MARKETPLACE_PRICE_ASC_ALGOLIA_INDEX = `${env}_items_price_asc`
export const ITEMS_CUSTOM_ALGOLIA_INDEX = `${env}_custom`
export const BLOG_POST_ALGOLIA_INDEX = `${env}_posts`
export const BLOG_DROP_ALGOLIA_INDEX = `${env}_drops`
export const BLOG_DROP_ARCHIVE_ALGOLIA_INDEX = `${env}_drops_archive`
export const BLOG_DROP_NEWEST_ALGOLIA_INDEX = `${env}_drops_newest`
export const DEALS_ALGOLIA_INDEX = `${env}_deals`
export const DESIGNERS_ALGOLIA_INDEX = `${env}_designers`
// ===============================================================================
