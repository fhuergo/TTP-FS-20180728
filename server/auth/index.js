const router = require("express").Router()
const User = require("../user")
module.exports = router

router.post("/login", async (req, res, next) => {
  try {
    console.log("/auth/index.js/login hit")
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      console.log("No such user found:", req.body.email)
      res.status(401).send("Wrong username and/or password")
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email)
      res.status(401).send("Wrong username and/or password")
    } else {
      console.log("logging in user")
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post("/signup", async (req, res, next) => {
  console.log("/auth/index.js/signup hit")
  console.log("req.body is", req.body)
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists")
    } else {
      next(err)
    }
  }
})

router.post("/logout", (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect("/")
})

router.get("/me", (req, res) => {
  if (req.user && req.user.id) {
    res.json(req.user)
  } else {
    res.sendStatus(204)
  }
})
