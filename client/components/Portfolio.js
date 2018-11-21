import React, { Component } from "react"
import { connect } from "react-redux"
import { getPortfolio } from "../store/reducers/portfolio"

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.userId = props.userId
  }
  componentDidMount() {
    this.props.fetchPortfolio(this.userId)
  }
  render() {
    return (
      <div>
        {this.props.portfolio.map((item, idx) => {
          return <div key={idx}>{item}</div>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  portfolio: state.portfolio
})

const mapDispatchToProps = dispatch => ({
  fetchPortfolio: userId => dispatch(getPortfolio(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio)
