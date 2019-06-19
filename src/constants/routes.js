export const HOME = "/"

export const BLOG_BASE = "/czytaj"
export const BLOG_HOME = BLOG_BASE + "/h"
export const BLOG_POST = BLOG_BASE + "/p/:id"
export const BLOG_TAG = BLOG_BASE + "/t/:tag"
export const BLOG_CATEGORY = BLOG_BASE + "/k/:category"

export const DROPS = "/dropy"
export const DROP_DETAILS = DROPS + "/d/:id"
export const DROPS_SECTION = DROPS + "/s/:id"

export const MARKETPLACE = "/kupuj"
export const DESIGNER = "/marki/:id"

export const ITEM_DETAILS = "/i/:id"
export const NEW_ITEM = "/i/nowy"
export const DELETE_ITEM = "/i/usun/:id"
export const EDIT_ITEM = "/i/:id/edytuj"
export const ITEM_PROMOTE = "/i/:id/promuj"
export const ITEM_PROMOTE_AFTER = "/po-promowaniu"

export const DESIGNERS = "/marki"

export const SIGN_UP = "/rejestracja"
export const SIGN_IN = "/login"
export const PASSWORD_FORGET = "/pw-reset"

export const ACCOUNT_BASE = "/profil/:id"
export const ACCOUNT_ITEMS = ACCOUNT_BASE + "/oferty"
export const ACCOUNT_SAVED_ITEMS = ACCOUNT_BASE + "/zapisane_przedmioty"
export const ACCOUNT_SAVED_FILTERS = ACCOUNT_BASE + "/zapisane_filtry"
export const ACCOUNT_SAVED_USERS = ACCOUNT_BASE + "/obserwowani"
export const ACCOUNT_SAVED_DROPS = ACCOUNT_BASE + "/dropy"
export const ACCOUNT_FEEDBACK = ACCOUNT_BASE + "/opinie"
export const ACCOUNT_SETTINGS = ACCOUNT_BASE + "/edytuj"
export const ACCOUNT_CHAT = ACCOUNT_BASE + "/wiadomosci"

export const CHAT = "/wiadomosci"
export const CHAT_ROOM = "/wiadomosci/r/:roomId"
export const CHAT_NEW = "/wiadomosci/n/:id"

export const SEARCH = "/szukaj"
export const REQUEST_DESIGNER = "/req_des"

export const INFO_BASE = "/info"
export const ABOUT = INFO_BASE + "/o-nas"
export const CONTACT = INFO_BASE + "/kontakt"
export const FAQ = INFO_BASE + "/faq"
export const PROMOTING_INFO = INFO_BASE + "/promowanie"
export const ALLOW_ADS = INFO_BASE + "/reklamy"
export const ALLOW_NOTIFICATIONS = INFO_BASE + "/powiadomienia"
export const BUG_REPORT = INFO_BASE + "/zglos_problem"
export const ADVERTISE = INFO_BASE + "/reklamuj_sie"
export const PARTNERS = INFO_BASE + "/partnerzy"
export const WRITE_FOR_US = INFO_BASE + "/pisz_dla_nas"
export const TERMS = INFO_BASE + "/regulamin"
export const PRIVACY_POLICY = INFO_BASE + "/polityka-prywatnosci"

export const ADMIN_BASE = "/admin"
export const ADMIN_BLOG = ADMIN_BASE + "/blog"
export const ADMIN_BLOG_ADD = ADMIN_BASE + "/blog/n"
export const ADMIN_BLOG_EDIT = ADMIN_BASE + "/blog/e/:id"
export const ADMIN_DROPS = ADMIN_BASE + "/drops"
export const ADMIN_DROPS_ADD = ADMIN_BASE + "/drops/n"
export const ADMIN_DROPS_EDIT = ADMIN_BASE + "/drops/e/:id"
export const ADMIN_ITEMS = ADMIN_BASE + "/items"
export const ADMIN_USERS = ADMIN_BASE + "/users"
export const ADMIN_DESIGNERS = ADMIN_BASE + "/designers"
export const ADMIN_DESIGNER_EDIT = ADMIN_BASE + "/designers/:id"

// External
// TODO: create social media pages and add addresses
export const FACEBOOK_PROFILE = ""
export const TWITTER_PROFILE = ""
export const INSTAGRAM_PROFILE = ""

// Test routes (don't alter or test will fail)
export const TEST_ROUTE = "route"
export const TEST_ROUTE_WITH_SUBROUTE = "route/:one"
export const TEST_ROUTE_WITH_MULTIPLE_SUBROUTES = "route/:one/:two"
