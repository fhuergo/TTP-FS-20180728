const router = require("express").Router()

router.use("/login", require("./login"))
router.use("/user", require("./user"))
router.use("/portfolio", require("./portfolio"))
router.use("/transaction", require("./transaction"))

router.use(function(req, res, next) {
  const err = new Error("Not found.")
  err.status = 404
  next(err)
})

module.exports = router
