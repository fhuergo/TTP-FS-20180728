const Sequelize = require("sequelize")
const { db } = require("../index")

const { STRING, INTEGER } = Sequelize

const PortfolioItem = db.define(
  "portfolio-item",
  {
    company: {
      type: STRING,
      allowNull: false
    },
    numShares: {
      type: INTEGER,
      allowNull: false,
      validate: { min: 0 }
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      validate: { min: 1 }
    }
  },
  {
    hooks: {
      beforeCreate: capitalizeCompany
    }
  }
)

// must stay as ES5
function capitalizeCompany(portfolioItem) {
  portfolioItem.company = portfolioItem.company.toUpperCase()
}

module.exports = PortfolioItem
