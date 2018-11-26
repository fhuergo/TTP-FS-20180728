const express = require("express")
const router = express.Router()
const axios = require("axios")
const PortfolioItem = require("../db/models/portfolio")

router.get("/:userId", async (req, res, next) => {
  try {
    const portfolio = await PortfolioItem.findAll({
      where: { userId: req.params.userId }
    })
    if (portfolio) {
      res.status(200).send(portfolio)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

// purchasing stock not previously held
router.post("/", async (req, res, next) => {
  try {
    const newItem = await PortfolioItem.create(req.body)
    const allMyItems = await PortfolioItem.findAll({
      where: { userId: newItem.userId }
    })
    res.status(201).send(allMyItems)
    //res.status(201).send(newPortfolioItem)
  } catch (err) {
    next(err)
  }
})

// if purchasing more of something user already has
router.put("/:portfolioId", async (req, res, next) => {
  try {
    const portfolioItem = await PortfolioItem.findByPk(req.params.portfolioId)
    const newPI = await portfolioItem.update(req.body)
    const allMyItems = await PortfolioItem.findAll({
      where: { userId: newPI.userId }
    })
    res.status(201).send(allMyItems)
  } catch (err) {
    next(err)
  }
})

// if selling
// router.delete("/:portfolioId", async (req, res, next) => {
//   try {
//     const itemToDelete = await PortfolioItem.findByPk(req.params.portfolioId)
//     if (!itemToDelete) {
//       res.sendStatus(404)
//     } else {
//       await itemToDelete.destroy()
//       res.sendStatus(204)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router
