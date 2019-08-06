// FRONT-END

export const BRAND_NAME = "StreetZone"
export const CONTACT_EMAIL = "kontakt@streetzone.pl"
export const PROD_DOMAIN = "streetzone.pl"
export const PROD_URL = "https://streetzone.pl"

export const MIN_PASSWORD_LENGTH = 8
export const ATTACHMENTS_MAX_COUNT = 9
export const ATTACHMENTS_MAX_SIZE = 5242880
export const DESC_MAX_CHARACTERS = 500
export const ACCOUNT_DESC_MAX_CHARACTERS = 200
export const COMMENT_MAX_CHARACTERS = 400
export const ITEM_DESC_PLACEHOLDER =
	"Oryginalna cena, możliwości wysyłki, informacje o uszkodzeniach itd."

// shared with with client code (ALWAYS UPDATE BOTH)
export const S_THUMB_POSTFIX = "_100_THUMB"
export const M_THUMB_POSTFIX = "_500_THUMB"
export const L_THUMB_POSTFIX = "_1000_THUMB"

// shared with with client code (ALWAYS UPDATE BOTH)
export const STORAGE_BUCKET_BLOG_ATTACHMENTS = "blog-attachments"
export const STORAGE_BUCKET_DROP_ATTACHMENTS = "drop-attachments"
export const STORAGE_BUCKET_DEAL_ATTACHMENTS = "deal-attachments"
export const STORAGE_BUCKET_ITEM_ATTACHMENTS = "item-attachments"
export const STORAGE_BUCKET_PROFILE_PICTURES = "profile-pictures"
export const STORAGE_BUCKET_AUTHOR_PICTURES = "author-pictures"
export const STORAGE_BUCKET_BRAND_LOGOS = "brand-logos"

// eslint-disable-next-line
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Social Media
// TODO: create social media pages and add addresses
export const FACEBOOK_PROFILE = ""
export const TWITTER_PROFILE = ""
export const INSTAGRAM_PROFILE = ""

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
