import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Transactions from "./Transactions"
import PortfolioAndBuy from "./PortfolioAndBuy"
import NavBar from "./NavBar"
import { getPortfolio } from "../store/reducers/portfolio"
import { connect } from "react-redux"

import { retrieveTransactions } from "../store/reducers/transaction"

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: "not yet updated"
    }
    this.alreadyHasTheStock = this.alreadyHasTheStock.bind(this)
    this.goHome = this.goHome.bind(this)
  }
  componentDidMount() {
    const { userId, fetchPortfolio, fetchTransactions } = this.props
    const setState = this.setState.bind(this)
    fetchPortfolio(userId)
    fetchTransactions(userId)
    this.interval = setInterval(function() {
      fetchPortfolio(userId)
      setState({ portfolio: "updated" })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
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
  goHome() {
    this.props.history.push("/login")
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
          <NavBar name={name} goHome={this.goHome} />
          <hr />
          <Route exact path="/home" render={MyPortfolioAndBuyStocksPages} />
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
