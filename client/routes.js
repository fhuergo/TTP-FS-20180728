import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"
import { Login, Signup, UserHome } from "./components"
import { me } from "./store/actions/users"

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.me()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    // { me, fetchProducts, fetchCart }
    { me }
  )(Routes)
)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
