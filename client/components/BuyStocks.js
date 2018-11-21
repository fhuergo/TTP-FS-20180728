import React, { Component } from "react"
import { connect } from "react-redux"
import { getCash } from "../store/reducers/cash"

class BuyStocks extends Component {
  constructor(props) {
    super(props)
    this.userId = props.userId
  }
  componentDidMount() {
    this.props.loadCash(this.userId)
  }
  render() {
    return (
      <div>
        <div>Cash: {this.props.cash}</div>
        <div>Stock:</div>
        <div>Quantity:</div>
        <div>Buy button</div>
      </div>
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
