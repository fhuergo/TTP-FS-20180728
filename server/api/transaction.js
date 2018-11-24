const express = require("express")
const router = express.Router()
const Transaction = require("../db/models/transaction")

router.get("/:userId", async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({
      where: { userId: req.params.userId }
    })
    res.status(200).send(allTransactions)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body)
    const allTransactions = await Transaction.findAll({
      where: { userId: newTransaction.userId }
    })
    res.status(200).send(allTransactions)
  } catch (err) {
    next(err)
  }
})

module.exports = router
