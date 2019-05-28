export const HOME = "/"

export const BLOG_BASE = "/czytaj"
export const BLOG_HOME = BLOG_BASE + "/h"
export const BLOG_POST = BLOG_BASE + "/p/:id"
export const BLOG_TAG = BLOG_BASE + "/t/:tag"
export const BLOG_CATEGORY = BLOG_BASE + "/k/:category"

export const DROPS = "/dropy"
export const DROP_DETAILS = DROPS + "/d/:id"

export const MARKETPLACE = "/kupuj"
export const DESIGNER = "/marki/:id"

export const ITEM_DETAILS = "/i/:id"
export const NEW_ITEM = "/i/nowy"
export const DELETE_ITEM = "/i/usun/:id"
export const EDIT_ITEM = "/i/:id/edytuj"

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

export const FAQ = "/faq"
export const PRIVACY_POLICY = "/polityka-prywatnosci"
export const ABOUT = "/o-nas"
export const CONTACT = "/kontakt"
export const TERMS = "/regulamin"
export const PROMOTING_INFO = "/promowanie"
export const BUG_REPORT = "/zglos_problem"
export const REQUEST_DESIGNER = "/req_des"

export const ADMIN_BASE = "/admin"
export const ADMIN_BLOG = ADMIN_BASE + "/blog"
export const ADMIN_BLOG_EDIT_POST = ADMIN_BASE + "/blog/e_post/:id"
export const ADMIN_BLOG_EDIT_DROP = ADMIN_BASE + "/blog/e_drop/:id"
export const ADMIN_BLOG_ADD_POST = ADMIN_BASE + "/blog/n_post"
export const ADMIN_BLOG_ADD_DROP = ADMIN_BASE + "/blog/n_drop"

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
