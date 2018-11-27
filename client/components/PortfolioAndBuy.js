import React, { Fragment } from "react"
import Portfolio from "./Portfolio"
import BuyStocks from "./BuyStocks"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

const Styles = theme => ({
  root: {
    width: "100%",
    marginTop: 5,
    overflowX: "auto",
    maxWidth: 600
  }
})

const PortfolioAndBuy = ({ portfolio, alreadyHasTheStock }) => {
  return (
    <Paper>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Portfolio portfolio={portfolio} />
            </TableCell>
            <TableCell>
              <BuyStocks alreadyHasTheStock={alreadyHasTheStock} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(Styles)(PortfolioAndBuy)
