const express = require("express")
const router = express.Router()
const User = require("../db/models/user")
const PortfolioItem = require("../db/models/portfolio")

router.get("/:userId", async (req, res, next) => {
  try {
    const user = User.findAll({
      where: { id: +req.params.userId }
      //include: [{ model: PortfolioItem }]
    })
    if (user) {
      res.status(200).send(user)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.put("/:userId", async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.userId)
    if (!userToUpdate) {
      res.sendStatus(404)
    } else {
      const updatedUser = await userToUpdate.update(req.body)
      res.status(201).send(updatedUser)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
