// relations go here
// eager loading in express routes after!
//const { db } = require("../index")
const User = require("./user")
const PortfolioItem = require("./portfolio")
const Transaction = require("./transaction")

User.hasMany(PortfolioItem, { as: "userId" })
PortfolioItem.belongsTo(User, { as: "userId" })

User.hasMany(Transaction)
Transaction.belongsTo(User)

module.exports = { User, PortfolioItem, Transaction }
