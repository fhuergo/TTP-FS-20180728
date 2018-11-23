import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"
import { updateUser } from "../store/actions/users"
import { updateStock, createPortfolioItem } from "../store/reducers/portfolio"
import { bindActionCreators } from "redux"

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
    if (!this.state.stockBeingTypedIn) {
      this.setState({ latestPrice: 0 })
    } else {
      try {
        const stock = await axios.get(
          `https://api.iextrading.com/1.0/stock/${this.state.stockBeingTypedIn.toLowerCase()}/batch?types=quote,news,chart&range=1m&last=10`
        )
        if (stock) {
          this.setState({
            latestPrice: stock.data.quote.latestPrice,
            openingPrice: stock.data.quote.open
          })
        } else {
          this.setState({ latestPrice: 0 })
        }
      } catch (err) {
        this.setState({ latestPrice: 0 })
        console.log(err)
      }
    }
  }
  handleQuantChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleBuy(event) {
    event.preventDefault()
    const {
      cash,
      updateCashAmount,
      user,
      alreadyHasTheStock,
      updateStockItem,
      newStockItem
    } = this.props
    const { quantityBeingTypedIn, stockBeingTypedIn } = this.state
    this.setState({ currentError: "Loading..." })
    //let latestPrice
    let stock
    try {
      stock = await axios.get(
        `https://api.iextrading.com/1.0/stock/${this.state.stockBeingTypedIn.toLowerCase()}/batch?types=quote,news,chart&range=1m`
      )
      // if (stock) {
      //   latestPrice = stock.data.quote.latestPrice
      // }
    } catch (err) {
      this.setState({ currentError: "That ticker doesn't exist." })
      return
    }
    if (quantityBeingTypedIn % 1 !== 0) {
      this.setState({
        currentError: "You may only buy whole number quantities of shares."
      })
      return
    }
    const notEnoughMoney =
      cash - this.state.latestPrice * quantityBeingTypedIn < 0
    if (notEnoughMoney) {
      this.setState({
        currentError: "Funds not adequate to make this purchase."
      })
    } else {
      // process the purchase:

      // update user's cash amount
      let newCashAmount = cash - this.state.latestPrice * quantityBeingTypedIn
      newCashAmount = newCashAmount.toFixed(2)
      let updatedUser = user
      updatedUser.cash = newCashAmount
      updateCashAmount(user.id, updatedUser)

      // check if already have company in portfolio
      const idAndNumShares = alreadyHasTheStock(
        stockBeingTypedIn,
        quantityBeingTypedIn
      )
      if (idAndNumShares) {
        updateStockItem(idAndNumShares, stockBeingTypedIn, user.id)
      } else {
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
    const { latestPrice, openingPrice, stockBeingTypedIn } = this.state
    const newCash = Number(cash)
    let color
    if (latestPrice > openingPrice) {
      color = "green"
    } else if (latestPrice < openingPrice) {
      color = "red"
    } else {
      color = "gray"
    }
    return (
      <form onSubmit={this.handleBuy}>
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
        </div>{" "}
        <font color={color}>{latestPrice ? latestPrice.toFixed(2) : ""}</font>
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
    dispatch(createPortfolioItem(stock, quantity, userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks)
