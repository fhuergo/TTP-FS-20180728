const router = require("express").Router()

router.use(function(req, res, next) {
  const err = new Error("Not found.")
  err.status = 404
  next(err)
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html');
});

module.exports = router
