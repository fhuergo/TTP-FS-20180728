import React, { Component } from "react"
import Portfolio from "./Portfolio"
import BuyStocks from "./BuyStocks"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { connect } from "react-redux"
import { retrieveTransactions } from "../store/reducers/transaction"
import { getPortfolio } from "../store/reducers/portfolio"

const Styles = theme => ({
  root: {
    width: "100%",
    marginTop: 5,
    overflowX: "auto",
    maxWidth: 600
  }
})

class PortfolioAndBuy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      portfolio: "not yet updated"
    }
  }
  async componentDidMount() {
    const { userId, loadPortfolio } = await this.props
    const setState = this.setState.bind(this)
    await this.props.loadPortfolio(userId)
    this.interval = setInterval(function() {
      loadPortfolio(userId)
      setState({ portfolio: "updated" })
    }, 1000)
    await this.props.retrieveTransactions(userId)
    this.setState({ loaded: true })
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return (
      <Paper>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Portfolio
                  portfolio={this.state.loaded ? this.props.portfolio : []}
                />
              </TableCell>
              <TableCell>
                <BuyStocks alreadyHasTheStock={this.props.alreadyHasTheStock} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  portfolio: state.portfolio,
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  loadPortfolio: userId => dispatch(getPortfolio(userId)),
  retrieveTransactions: userId => dispatch(retrieveTransactions(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Styles)(PortfolioAndBuy))
