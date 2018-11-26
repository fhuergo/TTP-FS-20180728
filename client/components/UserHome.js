import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Transactions from "./Transactions"
import { getPortfolio } from "../store/reducers/portfolio"
import { connect } from "react-redux"
import PortfolioAndBuy from "./PortfolioAndBuy"
import { retrieveTransactions } from "../store/reducers/transaction"

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.alreadyHasTheStock = this.alreadyHasTheStock.bind(this)
  }
  componentDidMount() {
    this.props.fetchPortfolio(this.props.userId)
    this.props.fetchTransactions(this.props.userId)
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
    const { name, portfolio, transactions } = this.props
    const MyPortfolioAndBuyStocksPages = props => {
      return (
        <PortfolioAndBuy
          portfolio={portfolio}
          alreadyHasTheStock={this.alreadyHasTheStock}
          {...props}
        />
      )
    }
    const MyTransactionsPage = props => {
      return <Transactions transactions={transactions} {...props} />
    }
    return (
      <Router>
        <div style={{ width: 1000, margin: "0 auto" }}>
          <ul>
            <li>
              <Link to="/portfolio">Portfolio / Buy Stocks</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
          </ul>
          Welcome, {name}
          <hr />
          <Route
            exact
            path="/portfolio"
            render={MyPortfolioAndBuyStocksPages}
          />
          <Route exact path="/transactions" render={MyTransactionsPage} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  userId: state.user.id,
  portfolio: state.portfolio,
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  fetchPortfolio: userId => dispatch(getPortfolio(userId)),
  fetchTransactions: userId => dispatch(retrieveTransactions(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHome)
