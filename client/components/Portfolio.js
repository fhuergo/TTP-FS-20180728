import React, { Component } from "react"
import { connect } from "react-redux"

class Portfolio extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // const portfolio = this.props.portfolio
    //   ? this.props.portfolio.map((item, idx) => {
    //       return <div key={idx}>{item}</div>
    //     })
    //   : ""
    return <div />
  }
}

const mapStateToProps = state => ({
  userId: state.user.id
})

export default connect(mapStateToProps)(Portfolio)
