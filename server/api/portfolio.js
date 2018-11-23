const express = require("express")
const router = express.Router()
const PortfolioItem = require("../db/models/portfolio")

router.get("/:userId", async (req, res, next) => {
  try {
    let { userId } = req.params
    userId = Number(userId)
    const portfolio = await PortfolioItem.findAll({
      where: { userId }
    })
    if (portfolio) {
      res.status(200).send(portfolio) // returns HTML file
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
    const newPortfolioItem = await PortfolioItem.create(req.body)
    res.status(201).send(newPortfolioItem)
  } catch (err) {
    next(err)
  }
})

// if purchasing more of something user already has
router.put("/:portfolioId", async (req, res, next) => {
  try {
    const portfolioItem = await PortfolioItem.findByPk(req.params.portfolioId)
    const newPI = await portfolioItem.update(req.body)
    res.status(201).send(newPI)
  } catch (err) {
    next(err)
  }
})

// if selling
// router.delete("/:portfolioId", async (req, res, next) => {
//   try {
//     const itemToDelete = await PortfolioItem.findById(req.params.portfolioId)
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
