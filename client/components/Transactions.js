import React, { Component } from "react"
import { retrieveTransactions } from "../store/reducers/transaction"
import { connect } from "react-redux"

class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactions(this.props.userId)
  }
  render() {
    return (
      <div>
        Transactions
        {this.props.transactions.map((transaction, idx) => {
          const { company, numShares, price } = transaction
          return (
            <div key={idx}>
              BUY ({company.toUpperCase()}) - {numShares} Shares @ {price}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getTransactions: userId => dispatch(retrieveTransactions(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions)
