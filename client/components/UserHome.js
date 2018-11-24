import React, { Component } from "react"
import axios from "axios"
import Portfolio from "./Portfolio"
import BuyStocks from "./BuyStocks"
import Transactions from "./Transactions"
import { getPortfolio } from "../store/reducers/portfolio"
import { connect } from "react-redux"

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolioTotal: ""
    }
    this.alreadyHasTheStock = this.alreadyHasTheStock.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
  }
  componentDidMount() {
    this.props.fetchPortfolio(this.props.userId)
    this.calculateTotal()
  }
  calculateTotal() {
    let portfolioTotal = 0
    this.props.portfolio.forEach(async item => {
      const itemData = await axios.get(
        `https://api.iextrading.com/1.0/stock/${item.company.toLowerCase()}/batch?types=quote,news,chart&range=1m&last=10`
      )
      portfolioTotal += itemData.data.quote.latestPrice
      // THIS WOULD BE AT ORIGINAL PURCHASES NOT CURRENT VALUE!
    })
    this.setState({ portfolioTotal })
  }
  alreadyHasTheStock(stock, additionalQuantity) {
    for (let i = 0; i < this.props.portfolio.length; i++) {
      let stockItem = this.props.portfolio[i]
      if (stockItem.company.toUpperCase() === stock.toUpperCase()) {
        return [stockItem.id, +stockItem.numShares + +additionalQuantity]
      }
    }
    return null
  }
  render() {
    const { name, portfolio, portfolioTotal } = this.props
    return (
      <div>
        Welcome, {name}
        <Portfolio portfolio={portfolio} portfolioTotal={portfolioTotal} />
        <BuyStocks alreadyHasTheStock={this.alreadyHasTheStock} />
        <Transactions />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  userId: state.user.id,
  portfolio: state.portfolio
})

const mapDispatchToProps = dispatch => ({
  fetchPortfolio: userId => dispatch(getPortfolio(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHome)
