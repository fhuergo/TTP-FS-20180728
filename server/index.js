const express = require("express")
const app = express()
const morgan = require("morgan")
app.use(morgan("dev"))
const path = require("path")
const passport = require("passport")
const session = require("express-session")
const bodyParser = require("body-parser")
const { db } = require("./db")
app.use(express.static(path.join(__dirname, "..", "public"))) // can access css, etc
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// configure and create database store
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const dbStore = new SequelizeStore({ db: db })

// sync so that session table gets created
dbStore.sync()

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

app.use(
  session({
    secret: process.env.SESSION_SECRET || "a wildly insecure secret",
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use("/api", require("./api"))
app.use("/auth", require("./auth"))

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "index.html")) // index.html stays so bundle.js can be accessed!
})

app.use(function(err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error.")
})

db.sync()

const port = process.env.PORT || 3000
app.listen(port, function() {
  console.log(`Server listening on port ${port}`)
})
