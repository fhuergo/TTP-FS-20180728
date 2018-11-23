const express = require("express")
const router = express.Router()
const PortfolioItem = require("../db/models/portfolio")

// may not need this, since would only grab all from user's (eager loaded)
// router.get("/:portfolioId", async (req, res, next) => {
//   try {
//     const portfolioItem = await PortfolioItem.findById(req.params.portfolioId)
//     if (!portfolioItem) {
//       res.sendStatus(404)
//     } else {
//       res.status(200).send(portfolioItem)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (user) {
      const portfolio = await user.getPortfolio()
      if (portfolio) {
        res.status(200).send(portfolio)
      } else {
        res.status(200).send([])
      }
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
