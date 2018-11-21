const router = require("express").Router()

router.use(require("./login"))

router.get("/", (req, res, next) => {
  res.send("hooray")
})

router.use(function(req, res, next) {
  const err = new Error("Not found.")
  err.status = 404
  next(err)
})

module.exports = router
