import React, { Component } from "react"
import Portfolio from "./Portfolio"
import BuyStocks from "./BuyStocks"
import { connect } from "react-redux"
import { userInfo } from "os"

class UserHome extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        Welcome, {this.props.name}
        <Portfolio />
        <BuyStocks />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  name: state.user.name
})

export default connect(mapStateToProps)(UserHome)
