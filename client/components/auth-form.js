import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { auth } from "../store/actions/users"

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props
  const nameInput =
    displayName === "Sign Up" ? (
      <div>
        <label htmlFor="usersName">
          <small>Name</small>
        </label>
        <input name="usersName" type="text" />
      </div>
    ) : (
      ""
    )
  return (
    <div>
      <form
        onSubmit={(evt, propsHistory) => handleSubmit(evt, props.history)}
        name={name}
      >
        {nameInput}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
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
