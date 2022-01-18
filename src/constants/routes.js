export const BASE_ROUTES = {
  BLOG_BASE: "/czytaj",
  DROPS_BASE: "/dropy",
  DEALS_BASE: "/okazje",
  ACCOUNT_BASE: "/profil/:id",
  ITEM_BASE: "/i/:id",
  INFO_BASE: "/info",
  ADMIN_BASE: "/admin",
  CHAT_BASE: "/wiadomosci",
}

export const ROUTES = {
  HOME: "/",

  BLOG_HOME: BASE_ROUTES.BLOG_BASE + "/h",
  BLOG_POST: BASE_ROUTES.BLOG_BASE + "/p/:id",
  BLOG_TAG: BASE_ROUTES.BLOG_BASE + "/tag",
  BLOG_CATEGORY: BASE_ROUTES.BLOG_BASE + "/k/:category",

  DROPS: BASE_ROUTES.DROPS_BASE,
  DROP_DETAILS: BASE_ROUTES.DROPS_BASE + "/d/:id",
  DROPS_SECTION: BASE_ROUTES.DROPS_BASE + "/s/:id",

  DEALS: BASE_ROUTES.DEALS_BASE,
  DEAL_DETAILS: BASE_ROUTES.DEALS_BASE + "/d/:id",

  MARKETPLACE: "/kupuj",
  DESIGNER: "/marki/:id",

  NEW_ITEM: "/wystaw-przedmiot",
  ITEM_DETAILS: BASE_ROUTES.ITEM_BASE,
  ITEM_DELETE: BASE_ROUTES.ITEM_BASE + "/usun",
  EDIT_ITEM: BASE_ROUTES.ITEM_BASE + "/edytuj",
  ITEM_PROMOTE: BASE_ROUTES.ITEM_BASE + "/promuj",
  ITEM_PROMOTE_AFTER: "/po-promowaniu",

  DESIGNERS: "/marki",

  SIGN_UP: "/rejestracja",
  SIGN_IN: "/login",
  PASSWORD_FORGET: "/pw-reset",

  MY_ACCOUNT: "/twoj_profil",
  ACCOUNT_BASE: BASE_ROUTES.ACCOUNT_BASE,
  ACCOUNT_ITEMS: BASE_ROUTES.ACCOUNT_BASE + "/oferty",
  ACCOUNT_SAVED_ITEMS: BASE_ROUTES.ACCOUNT_BASE + "/zapisane_przedmioty",
  ACCOUNT_SAVED_FILTERS: BASE_ROUTES.ACCOUNT_BASE + "/zapisane_filtry",
  ACCOUNT_SAVED_USERS: BASE_ROUTES.ACCOUNT_BASE + "/obserwowani",
  ACCOUNT_SAVED_DROPS: BASE_ROUTES.ACCOUNT_BASE + "/dropy",
  ACCOUNT_FEEDBACK: BASE_ROUTES.ACCOUNT_BASE + "/opinie",
  ACCOUNT_SETTINGS: BASE_ROUTES.ACCOUNT_BASE + "/edytuj",
  ACCOUNT_CHAT: BASE_ROUTES.ACCOUNT_BASE + "/wiadomosci",

  CHAT: BASE_ROUTES.CHAT_BASE,
  CHAT_ROOM: BASE_ROUTES.CHAT_BASE + "/r/:roomId",
  CHAT_NEW: BASE_ROUTES.CHAT_BASE + "/n/:id",

  SEARCH: "/szukaj",
  REQUEST_DESIGNER: "/req_des",

  ABOUT: BASE_ROUTES.INFO_BASE + "/o-nas",
  CONTACT: BASE_ROUTES.INFO_BASE + "/kontakt",
  FAQ: BASE_ROUTES.INFO_BASE + "/faq",
  PROMOTING_INFO: BASE_ROUTES.INFO_BASE + "/promowanie",
  ALLOW_ADS: BASE_ROUTES.INFO_BASE + "/reklamy",
  ALLOW_NOTIFICATIONS: BASE_ROUTES.INFO_BASE + "/powiadomienia",
  BUG_REPORT: BASE_ROUTES.INFO_BASE + "/zglos_problem",
  ADVERTISE: BASE_ROUTES.INFO_BASE + "/reklamuj_sie",
  PARTNERS: BASE_ROUTES.INFO_BASE + "/partnerzy",
  WRITE_FOR_US: BASE_ROUTES.INFO_BASE + "/pisz_dla_nas",
  TERMS: BASE_ROUTES.INFO_BASE + "/regulamin",
  PRIVACY_POLICY: BASE_ROUTES.INFO_BASE + "/polityka-prywatnosci",

  ADMIN_USERS: BASE_ROUTES.ADMIN_BASE + "/users",
  ADMIN_ITEMS: BASE_ROUTES.ADMIN_BASE + "/items",
  ADMIN_BLOG: BASE_ROUTES.ADMIN_BASE + "/blog",
  ADMIN_BLOG_ADD: BASE_ROUTES.ADMIN_BASE + "/blog/n",
  ADMIN_BLOG_EDIT: BASE_ROUTES.ADMIN_BASE + "/blog/e/:id",
  ADMIN_DROPS: BASE_ROUTES.ADMIN_BASE + "/drops",
  ADMIN_DROPS_ADD: BASE_ROUTES.ADMIN_BASE + "/drops/n",
  ADMIN_DROPS_EDIT: BASE_ROUTES.ADMIN_BASE + "/drops/e/:id",
  ADMIN_DEALS: BASE_ROUTES.ADMIN_BASE + "/deals",
  ADMIN_DEALS_ADD: BASE_ROUTES.ADMIN_BASE + "/deals/n",
  ADMIN_DEALS_EDIT: BASE_ROUTES.ADMIN_BASE + "/deals/e/:id",
  ADMIN_DESIGNERS: BASE_ROUTES.ADMIN_BASE + "/designers",
  ADMIN_DESIGNER_ADD: BASE_ROUTES.ADMIN_BASE + "/designers/n",
  ADMIN_DESIGNER_EDIT: BASE_ROUTES.ADMIN_BASE + "/designers/e/:id",
  ADMIN_AUTHORS: BASE_ROUTES.ADMIN_BASE + "/author",
  ADMIN_AUTHORS_ADD: BASE_ROUTES.ADMIN_BASE + "/author/n",
  ADMIN_AUTHORS_EDIT: BASE_ROUTES.ADMIN_BASE + "/author/e/:id",
}

// Test routes (don't alter or test will fail)
export const TEST_ROUTE = "route"
export const TEST_ROUTE_WITH_SUBROUTE = "route/:one"
export const TEST_ROUTE_WITH_MULTIPLE_SUBROUTES = "route/:one/:two"

export default ROUTES
