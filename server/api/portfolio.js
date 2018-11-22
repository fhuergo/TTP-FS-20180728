const express = require("express")
const router = express.Router()
const PortfolioItem = require("../db/models/portfolio")

router.get("/:portfolioId", async (req, res, next) => {
  try {
    const portfolioItem = await PortfolioItem.findById(req.params.portfolioId)
    if (!portfolioItem) {
      res.sendStatus(404)
    } else {
      res.status(200).send(portfolioItem)
    }
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const newPortfolioItem = await PortfolioItem.create(req.body)
    res.status(201).send(newPortfolioItem)
  } catch (err) {
    next(err)
  }
})

router.put("/:portfolioId", async (req, res, next) => {
  try {
    const portfolioItem = await PortfolioItem.findById(req.params.portfolioId)
    const newPI = await portfolioItem.update(req.body)
    res.status(201).send(newPI)
  } catch (err) {
    next(err)
  }
})

router.delete("/:portfolioId", async (req, res, next) => {
  try {
    const itemToDelete = await PortfolioItem.findById(req.params.portfolioId)
    if (!itemToDelete) {
      res.sendStatus(404)
    } else {
      await itemToDelete.destroy()
      res.sendStatus(204)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
