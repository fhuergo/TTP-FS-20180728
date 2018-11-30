import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { retrieveTransactions } from "../store/reducers/transaction"
import { connect } from "react-redux"

const Styles = theme => ({
  root: {
    width: 200,
    marginTop: 5,
    overflowX: "auto",
    maxWidth: 200
  }
})

class Transactions extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.loadTransactions(this.props.userId)
  }
  render() {
    return (
      <div>
        Transactions
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action & Company</TableCell>
              <TableCell numeric>Number of Shares</TableCell>
              <TableCell numeric>Share Price</TableCell>
              <TableCell numeric>Total</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.transactions.map((transaction, idx) => {
              const { company, numShares, price, createdAt } = transaction
              return (
                <TableRow key={idx}>
                  <TableCell>BUY ({company.toUpperCase()})</TableCell>{" "}
                  <TableCell numeric>{numShares}</TableCell>{" "}
                  <TableCell numeric>{price}</TableCell>
                  <TableCell numeric>
                    {(price * numShares).toFixed(2)}
                  </TableCell>
                  <TableCell>{createdAt.slice(0, 10)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  loadTransactions: userId => dispatch(retrieveTransactions(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(Transactions))
