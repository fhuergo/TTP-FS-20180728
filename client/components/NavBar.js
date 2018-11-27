import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import { removeUser } from "../store/actions/users"
import { removePortfolio } from "../store/reducers/portfolio"
import { removeTransactions } from "../store/reducers/transaction"
//import MenuIcon from "@material-ui/icons/MenuIcon"

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

function ButtonAppBar(props) {
  const { classes, name, goHome } = props
  const logout = () => {
    removePortfolio()
    removeTransactions()
    removeUser()
    goHome()
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Stock Portfolio App :: Welcome, {name}
          </Typography>
          <Link color="inherit" to="/portfolio">
            PORTFOLIO
          </Link>
          ::
          <Link color="inherit" to="/transactions">
            TRANSACTIONS
          </Link>
          ::
          <Link color="inherit" onClick={() => logout()} to="/login">
            LOGOUT
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonAppBar)
