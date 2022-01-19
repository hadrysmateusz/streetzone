const { isProd } = require("./firebaseConfig")

// !!! REMEMBER TO ALSO CHANGE IN "SRC/CONSTANTS/CONST.JS" !!!
exports.items = isProd ? "prod_items" : "dev_items"
exports.posts = isProd ? "prod_posts" : "dev_posts"
exports.drops = isProd ? "prod_drops" : "dev_drops"
exports.deals = isProd ? "prod_deals" : "dev_deals"
exports.designers = isProd ? "prod_designers" : "dev_designers"
