import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
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

const Portfolio = ({ portfolio, classes }) => {
  portfolio = portfolio.sort((a, b) => {
    return a.id - b.id
  })
  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell numeric>Number of Shares</TableCell>
            <TableCell numeric>Latest Price</TableCell>
            <TableCell numeric>Total Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolio.map((item, idx) => {
            const { company, numShares, color, latestPrice } = item
            return (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {company}
                </TableCell>
                <TableCell numeric>{numShares}</TableCell>
                <TableCell numeric>
                  <font color={color}>{latestPrice.toFixed(2)}</font>
                </TableCell>
                <TableCell numeric>
                  {(numShares * latestPrice).toFixed(2)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(Styles)(Portfolio)
