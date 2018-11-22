import React, { Component } from "react"
import { IEXClient } from "iex-api"
import { connect } from "react-redux"
import { getCash } from "../store/reducers/cash"
import axios from "axios"

class BuyStocks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stockBeingTypedIn: "",
      quantityBeingTypedIn: 0,
      currentError: ""
    }
    this.userId = props.userId
    this.handleChange = this.handleChange.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
  }
  componentDidMount() {
    this.props.loadCash(this.userId)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleBuy(event) {
    event.preventDefault()
    let latestPrice
    let stock
    try {
      stock = await axios.get(
        `https://api.iextrading.com/1.0/stock/${this.state.stockBeingTypedIn.toLowerCase()}/batch?types=quote,news,chart&range=1m&last=10`
      )
      if (stock) {
        latestPrice = stock.data.quote.latestPrice
      }
    } catch (err) {
      alert("That ticker doesn't exist.")
      return
    }
    const notEnoughMoney =
      this.props.cash - latestPrice * this.state.quantityBeingTypedIn < 0
    const fewerThanOneRequested = this.state.quantityBeingTypedIn <= 0
    if (fewerThanOneRequested) {
      this.setState({ currentError: "You need to buy at least one." })
    } else if (notEnoughMoney) {
      this.setState({
        currentError: "Funds not adequate to make this purchase."
      })
    } else {
      // update user's cash amount
      // if (stock already exists in portfolio) put request to PortfolioItem
      // else if (stock exists) post request a PortfolioItem
      this.setState({ currentError: "Purchased!" })
    }
  }
  render() {
    return (
      <form onSubmit={this.handleBuy}>
        <div>
          <label>Balance:</label> {this.props.cash}
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="text"
            name="stockBeingTypedIn"
            value={this.state.stockBeingTypedIn}
            onChange={evt => this.handleChange(evt)}
            maxLength="4"
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantityBeingTypedIn"
            value={this.state.quantityBeingTypedIn}
            onChange={evt => this.handleChange(evt)}
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
  loadCash: userId => dispatch(getCash(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks)
