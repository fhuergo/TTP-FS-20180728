import React, { Component } from "react"
import Portfolio from "./Portfolio"
import BuyStocks from "./BuyStocks"
import { getPortfolio } from "../store/reducers/portfolio"
import { connect } from "react-redux"

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.alreadyHasTheStock = this.alreadyHasTheStock.bind(this)
  }
  componentDidMount() {
    this.props.fetchPortfolio(this.props.userId)
    // get portfolio, pass down to portfolio (so updateStockOrCreateNew can access it to see if company already exists)
  }
  alreadyHasTheStock(stock, additionalQuantity) {
    console.log("alreadyHasTheStock hit")
    for (let i = 0; i < this.props.portfolio.length; i++) {
      let stockItem = this.props.portfolio[i]
      console.log(
        `${stockItem.company} (stockItem.company) vs ${stock} (stock)`
      )
      if (stockItem.company.toUpperCase() === stock.toUpperCase()) {
        return [stockItem.id, +stockItem.numShares + +additionalQuantity]
      }
    }
    return null
  }
  render() {
    return (
      <div>
        Welcome, {this.props.name}
        <Portfolio portfolio={this.props.portfolio} />
        <BuyStocks alreadyHasTheStock={this.alreadyHasTheStock} />
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
