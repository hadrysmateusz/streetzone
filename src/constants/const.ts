import config from "../components/Firebase/config"
import { ThumbnailSize } from "../utils/getImageUrl"

// There aren't 2 separate environments anymore which is why the "dev" needs to be hardcoded now
const env = /* process.env.REACT_APP_ENV */ "dev"

export const CONST = {
  BRAND_NAME: "StreetZone",
  CONTACT_EMAIL: "kontakt@streetzone.pl",
  PROD_DOMAIN: "streetzone.pl",
  PROD_URL: "https://streetzone.pl",

  // TODO: use actual
  TWITTER_PROFILE: "https://twitter.com/home",
  FACEBOOK_PROFILE: "https://www.facebook.com",
  INSTAGRAM_PROFILE: "https://www.instagram.com",

  MIN_PASSWORD_LENGTH: 8,
  ATTACHMENTS_MAX_COUNT: 9,
  ATTACHMENTS_MAX_SIZE: 5242880,
  DESC_MAX_CHARACTERS: 500,
  ACCOUNT_DESC_MAX_CHARACTERS: 200,
  COMMENT_MAX_CHARACTERS: 400,
  ITEM_DESC_PLACEHOLDER: "Oryginalna cena, możliwości wysyłki, informacje o uszkodzeniach itd.",

  DEFAULT_STORAGE_BUCKET: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/`,

  // shared with with server code (ALWAYS UPDATE BOTH)
  // TODO: migrate to new thumbnail postfixes
  S_THUMB_POSTFIX: "_S_THUMB" /* "_100_THUMB" */ as ThumbnailSize,
  M_THUMB_POSTFIX: "_M_THUMB" /* "_500_THUMB" */ as ThumbnailSize,
  L_THUMB_POSTFIX: "_L_THUMB" /* "_1000_THUMB */ as ThumbnailSize,

  // shared with with server code (ALWAYS UPDATE BOTH)
  STORAGE_BUCKET_BLOG_ATTACHMENTS: "blog-attachments",
  STORAGE_BUCKET_DROP_ATTACHMENTS: "drop-attachments",
  STORAGE_BUCKET_DEAL_ATTACHMENTS: "deal-attachments",
  STORAGE_BUCKET_ITEM_ATTACHMENTS: "attachments",
  STORAGE_BUCKET_PROFILE_PICTURES: "profile-pictures",
  STORAGE_BUCKET_AUTHOR_PICTURES: "author-pictures",
  STORAGE_BUCKET_BRAND_LOGOS: "brand-logos",

  // eslint-disable-next-line
  EMAIL_REGEX:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  // ===============================================================================
  // !!! REMEMBER TO ALSO CHANGE IN THE CLOUD FUNCTIONS DIRECTORY !!!
  ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX: `${env}_items`,
  ITEMS_MARKETPLACE_PRICE_ASC_ALGOLIA_INDEX: `${env}_items_price_asc`,
  ITEMS_CUSTOM_ALGOLIA_INDEX: `${env}_custom`,
  BLOG_POST_ALGOLIA_INDEX: `${env}_posts`,
  BLOG_DROP_ALGOLIA_INDEX: `${env}_drops`,
  BLOG_DROP_ARCHIVE_ALGOLIA_INDEX: `${env}_drops_archive`,
  BLOG_DROP_NEWEST_ALGOLIA_INDEX: `${env}_drops_newest`,
  DEALS_ALGOLIA_INDEX: `${env}_deals`,
  DESIGNERS_ALGOLIA_INDEX: `${env}_designers`,
  // ===============================================================================
}

export default CONST
