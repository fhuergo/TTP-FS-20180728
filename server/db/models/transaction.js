const Sequelize = require("sequelize")
const { db } = require("../index")

const { STRING, INTEGER, DECIMAL } = Sequelize

const Transaction = db.define("transaction", {
  company: {
    type: STRING,
    allowNull: false
  },
  numShares: {
    type: INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: { min: 0.01 }
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    validate: { min: 1 }
  }
})

module.exports = Transaction
