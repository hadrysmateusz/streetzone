// !!! CLOUD FUNCTIONS !!!

exports.DATE_FORMAT = "YY-MM-DD HH:mm"
exports.JPEG_EXTENSION = ".jpg"
exports.PRODUCTION_DOMAIN = "streetzone.pl"

// THUMBNAIL POSTFIXES
// shared with with client code (ALWAYS UPDATE BOTH)
exports.S_THUMB_POSTFIX = /* "_100_THUMB" */ "_S_THUMB"
exports.M_THUMB_POSTFIX = /* "_500_THUMB" */ "_M_THUMB"
exports.L_THUMB_POSTFIX = /* "_1000_THUMB */ "_L_THUMB"

// STORAGE BUCKETS
// shared with with client code (ALWAYS UPDATE BOTH)
exports.STORAGE_BUCKET_BLOG_ATTACHMENTS = "blog-attachments"
exports.STORAGE_BUCKET_DROP_ATTACHMENTS = "drop-attachments"
exports.STORAGE_BUCKET_DEAL_ATTACHMENTS = "deal-attachments"
exports.STORAGE_BUCKET_ITEM_ATTACHMENTS = "attachments"
exports.STORAGE_BUCKET_PROFILE_PICTURES = "profile-pictures"
exports.STORAGE_BUCKET_AUTHOR_PICTURES = "author-pictures"
exports.STORAGE_BUCKET_BRAND_LOGOS = "brand-logos"
