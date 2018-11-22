// relations go here
// eager loading in express routes after!
//const { db } = require("../index")
const User = require("./user")
const PortfolioItem = require("./portfolio")
console.log(`User is ${User}\nPortfolioItem is ${PortfolioItem}`)

User.hasMany(PortfolioItem)
PortfolioItem.belongsTo(User)

module.exports = { User, PortfolioItem }
