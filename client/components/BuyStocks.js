import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { updateUser } from "../store/actions/users"
import { updateStock, createPortfolioItem } from "../store/reducers/portfolio"
import { createTransaction } from "../store/reducers/transaction"

class BuyStocks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stockBeingTypedIn: "",
      quantityBeingTypedIn: 0,
      currentError: "",
      latestPrice: 0,
      openingPrice: 0
    }
    this.handleQuantChange = this.handleQuantChange.bind(this)
    this.handleStockChange = this.handleStockChange.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
  }
  async handleStockChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleQuantChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleBuy(event) {
    event.preventDefault()
    this.setState({ currentError: "Loading..." })
    const {
      cash,
      updateCashAmount,
      user,
      alreadyHasTheStock,
      updateStockItem,
      newStockItem,
      newTransaction
    } = this.props
    const { quantityBeingTypedIn, stockBeingTypedIn } = this.state
    let latestPrice
    try {
      const stock = await axios.get(
        `https://api.iextrading.com/1.0/stock/${stockBeingTypedIn.toLowerCase()}/batch?types=quote,news,chart&range=1m&last=10`
      )
      latestPrice = stock.data.quote.latestPrice
    } catch (err) {
      this.setState({
        currentError: `${stockBeingTypedIn.toUpperCase()} doesn't exist.`
      })
      return
    }
    if (quantityBeingTypedIn % 1 !== 0) {
      this.setState({
        currentError: "You may only buy whole number quantities of shares."
      })
      return
    }
    const notEnoughMoney = cash - latestPrice * quantityBeingTypedIn < 0
    if (notEnoughMoney) {
      this.setState({
        currentError: "Funds not adequate to make this purchase."
      })
    } else {
      // we accept the purchase and begin processing!

      // update user's cash amount
      let newCashAmount = cash - latestPrice * quantityBeingTypedIn
      newCashAmount = newCashAmount.toFixed(2)
      let updatedUser = user
      updatedUser.cash = newCashAmount
      updateCashAmount(user.id, updatedUser)

      // create transaction
      newTransaction(
        stockBeingTypedIn,
        quantityBeingTypedIn,
        latestPrice,
        user.id
      )

      // check if already have company in portfolio
      const idAndNumShares = alreadyHasTheStock(
        stockBeingTypedIn,
        quantityBeingTypedIn
      )
      if (idAndNumShares) {
        // if we already have shares of the company, update portfolio
        updateStockItem(idAndNumShares, stockBeingTypedIn, user.id)
      } else {
        // if we don't already have this company, create new row in portfolio
        newStockItem(stockBeingTypedIn, quantityBeingTypedIn, user.id)
      }

      this.setState({
        currentError: "Purchased!",
        stockBeingTypedIn: "",
        quantityBeingTypedIn: 0
      })
    }
  }
  render() {
    const { cash } = this.props
    const newCash = Number(cash)
    return (
      <form onSubmit={this.handleBuy} autoComplete="off">
        <div>
          <label>Balance:</label> {newCash.toFixed(2)}
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="text"
            name="stockBeingTypedIn"
            value={this.state.stockBeingTypedIn}
            onChange={evt => this.handleStockChange(evt)}
            maxLength="4"
            style={{ textTransform: "uppercase" }}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantityBeingTypedIn"
            value={this.state.quantityBeingTypedIn}
            onChange={evt => this.handleQuantChange(evt)}
            min="1"
            required
          />
        </div>
        <div>
          <button type="submit">Buy</button>
        </div>
        {this.state.currentError}
      </form>
    )
  }
}

const mapStateToProps = state => ({
  cash: state.user.cash,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  updateCashAmount: (userId, updatedUser) =>
    dispatch(updateUser(userId, updatedUser)),
  updateStockItem: (idAndNumShares, stockBeingTypedIn, userId) =>
    dispatch(updateStock(idAndNumShares, stockBeingTypedIn, userId)),
  newStockItem: (stock, quantity, userId) =>
    dispatch(createPortfolioItem(stock, quantity, userId)),
  newTransaction: (stock, quantity, buyingPrice, userId) =>
    dispatch(createTransaction(stock, quantity, buyingPrice, userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks)
