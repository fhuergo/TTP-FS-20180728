const crypto = require("crypto")
const _ = require("lodash")
const Sequelize = require("sequelize")

const db = require("./db")

const { STRING } = Sequelize

const User = db.define(
  "user",
  {
    name: {
      type: STRING,
      allowNull: false
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: STRING
    },
    salt: {
      type: STRING
    }
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    }
  }
)

User.prototype.correctPassword = function(candidatePassword) {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt) === this.password
  )
}

User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ["password", "salt"])
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64")
}

User.encryptPassword = function(plainText, salt) {
  const hash = crypto.createHash("sha1")
  hash.update(plainText)
  hash.update(salt)
  return hash.digest("hex")
}

function setSaltAndPassword(user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed("password")) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

module.exports = User
