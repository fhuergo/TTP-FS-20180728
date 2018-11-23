import React, { Component } from "react"
import { connect } from "react-redux"

class Portfolio extends Component {
  constructor(props) {
    super(props)
    this.portfolio = props.portfolio
  }
  render() {
    console.log("this.portfolio", this.portfolio)
    return (
      <div>
        {this.portfolio
          ? this.portfolio.map((item, idx) => {
              return <div key={idx}>{item}</div>
            })
          : ""}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id
})

export default connect(mapStateToProps)(Portfolio)
