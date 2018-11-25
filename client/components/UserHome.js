import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Portfolio from "./Portfolio"
import BuyStocks from "./BuyStocks"
import Transactions from "./Transactions"
import { getPortfolio } from "../store/reducers/portfolio"
import { connect } from "react-redux"

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.alreadyHasTheStock = this.alreadyHasTheStock.bind(this)
  }
  componentDidMount() {
    this.props.fetchPortfolio(this.props.userId)
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
    const { name, portfolio } = this.props
    const MyPortfolioPage = props => {
      return <Portfolio portfolio={portfolio} {...props} />
    }
    const MyBuyStocksPage = props => {
      return (
        <BuyStocks alreadyHasTheStock={this.alreadyHasTheStock} {...props} />
      )
    }
    return (
      <Router>
        <div style={{ width: 1000, margin: "0 auto" }}>
          <ul>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/buystocks">Buy stocks</Link>
            </li>
          </ul>
          Welcome, {name}
          <hr />
          <Route exact path="/portfolio" render={MyPortfolioPage} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/buystocks" render={MyBuyStocksPage} />
        </div>
      </Router>
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
