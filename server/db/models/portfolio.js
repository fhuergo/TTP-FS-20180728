const Sequelize = require("sequelize")
const { db } = require("../index")

const { STRING, INTEGER } = Sequelize

const PortfolioItem = db.define("portfolio-item", {
  company: {
    type: STRING,
    allowNull: false
  },
  numShares: {
    type: INTEGER,
    allowNull: false,
    validate: { min: 0 }
  }
})

module.exports = PortfolioItem
