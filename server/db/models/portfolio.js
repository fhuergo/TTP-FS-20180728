const Sequelize = require("sequelize")
const db = require("../index")

const { STRING, INTEGER } = Sequelize

const PortfolioItem = db.define("portfolio", {
  company: {
    type: STRING,
    allowNull: false
  },
  numShares: {
    type: INTEGER,
    allowNull: false,
    validate: { min: 0, max: Infinity }
  }
  // User will need class method that validates whether it already has a company in portfolio before adding new PortfolioItem..is it User that will?
  // Current value will be calculated live on the component, not saved in database
})

module.exports = PortfolioItem
