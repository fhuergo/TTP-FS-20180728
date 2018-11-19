const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "..", "./public")))
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api", require("./api"))

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"))
})
