// relations go here
// eager loading in express routes after!
const User = require("./user")
const PortfolioItem = require("./portfolio")

User.hasMany(PortfolioItem)
PortfolioItem.belongsTo(User)
