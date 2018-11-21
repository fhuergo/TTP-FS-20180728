import React, { Component } from "react"
import Portfolio from "./Portfolio"
import BuyStocks from "./BuyStocks"

export default class UserHome extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        Welcome,{" "}
        {this.props.name ? this.props.name : "(this.props.name is undefined)"}
        <Portfolio />
        <BuyStocks />
      </div>
    )
  }
}
