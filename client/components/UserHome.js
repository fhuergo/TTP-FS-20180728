import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Transactions from "./Transactions"
import PortfolioAndBuy from "./PortfolioAndBuy"
import NavBar from "./NavBar"
import { connect } from "react-redux"

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.alreadyHasTheStock = this.alreadyHasTheStock.bind(this)
    this.goHome = this.goHome.bind(this)
    this.state = {
      portfolio: "to update",
      userId: 0,
      stopInterval: false
    }
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
    const { name, transactions, userId } = this.props
    console.log("userId", userId)
    const MyPortfolioAndBuyStocksPages = props => {
      return (
        <PortfolioAndBuy
          alreadyHasTheStock={this.alreadyHasTheStock}
          userId={userId}
          clearInterval={this.clearInterval}
          stopInterval={this.state.stopInterval}
          {...props}
        />
      )
    }
    const MyTransactionsPage = props => {
      return (
        <Transactions transactions={transactions} userId={userId} {...props} />
      )
    }
    return (
      <Router>
        <div style={{ width: 1000, margin: "0 auto" }}>
          <NavBar
            name={name}
            goHome={this.goHome}
            endInterval={this.endInterval}
          />
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
  userId: state.user.id
})

export default connect(mapStateToProps)(UserHome)
