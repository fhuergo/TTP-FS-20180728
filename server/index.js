const express = require("express")
const app = express()
const morgan = require("morgan")
app.use(morgan("dev"))
const path = require("path")

const bodyParser = require("body-parser")
app.use(express.static(path.join(__dirname, "..", "public"))) // can access css, etc
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "index.html")) // index.html stays so bundle.js can be accessed!
})

app.use("/api", require("./api"))

app.use(function(err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error.")
})

const port = process.env.PORT || 3000
app.listen(port, function() {
  console.log("Knock, knock")
  console.log("Who's there?")
  console.log(`Your server, listening on port ${port}`)
})
