import React, { Component } from "react"
import { connect } from "react-redux"
import { getCash } from "../store/reducers/cash"

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
  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleBuy() {
    const invalidStock = false
    const notEnoughMoney = false //= currentMoney - toBuy <= 0
    if (invalidStock) {
      this.setState({ currentError: "That ticker doesn't exist!" })
    } else if (notEnoughMoney) {
      this.setState({
        currentError: "Funds not adequate to make this purchase."
      })
    } else {
      this.setState({ currentError: "" })
      // create transaction (BUY AAPL -- 6 Shares at $300)
      // add amount to account (or sell -- in the future)
    }
  }
  render() {
    return (
      <form onSubmit={this.handleBuy}>
        <div>
          <label>Cash:</label> {this.props.cash}
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="text"
            value={this.state.stockBeingTypedIn}
            onChange={this.handleChange}
            maxLength="4"
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={this.state.quantityBeingTypedIn}
            onChange={this.handleChange}
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
  cash: state.cash
})

const mapDispatchToProps = dispatch => ({
  loadCash: userId => dispatch(getCash(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyStocks)
