import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { auth } from "../store/actions/users"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
/**
 * COMPONENT
 */

const AuthForm = props => {
  for (let i = 0; i < 1000; i++) {
    window.clearInterval(i)
  }
  const { name, displayName, handleSubmit, error, history } = props
  const nameInput =
    displayName === "Sign Up" ? (
      <div>
        <label htmlFor="usersName">{/* <small>Name</small> */}</label>
        <TextField name="usersName" type="text" placeholder="name" />
      </div>
    ) : (
      ""
    )
  const antiDisplayName = displayName === "Sign Up" ? "Login" : "Sign Up"
  const linkName = antiDisplayName === "Sign Up" ? "signup" : "login"
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <div className="title">Portfolio Stock App</div>
        <form
          onSubmit={(evt, propsHistory) => handleSubmit(evt, history)}
          name={name}
          className="login-form"
        >
          {nameInput}
          <div>
            <TextField
              name="email"
              type="email"
              placeholder="email"
              className="input"
            />
          </div>
          <div>
            <TextField
              name="password"
              type="password"
              placeholder="password"
              className="input"
            />
          </div>
          <div>
            <Button width="100%" type="submit" className="log-btn button">
              {displayName}
            </Button>
            <Button href={`/${linkName}`}>{antiDisplayName}?</Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </Grid>
    </Grid>
  )
}

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, propsHistory) {
      evt.preventDefault()
      const formName = evt.target.name
      const usersName = evt.target.usersName ? evt.target.usersName.value : ""
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(usersName, email, password, formName))
      propsHistory.push("/home")
    }
  }
}

export const Login = connect(
  mapLogin,
  mapDispatch
)(AuthForm)
export const Signup = connect(
  mapSignup,
  mapDispatch
)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
