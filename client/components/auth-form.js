import React, {component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <div>
            <label htmlFor="Firstname">
              <small> First Name</small>
            </label>
            <input name="firstName" type="text" />

            <label htmlFor="Lastname">
              <small> Last Name</small>
            </label>
            <input name="lastName" type="text" />

            <label htmlFor="shippingAddress">
              <small> Shipping Address</small>
            </label>
            <input name="shippingAddress" type="text" />

            <label htmlFor="billingAddress">
              <small> Billing Address</small>
            </label>
            <input name="billingAddress" type="text" />

            <label htmlFor="phoneNumber">
              <small> Phone Number</small>
            </label>
            <input name="PhoneNumber" type="number" />

            <label htmlFor="creditCard">
              <small> Credit Card</small>
            </label>
            <input name="ccNumber" type="number" />
          </div>
        )}

        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" />

        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" />

        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const firstName = evt.target.firstName ? evt.target.firstName.value : null
      const lastName = evt.target.lastName ? evt.target.lastName.value : null
      const shippingAddress = evt.target.shippingAddress
        ? evt.target.shippingAddress.value
        : null
      const billingAddress = evt.target.billingAddress
        ? evt.target.billingAddress.value
        : null
      const PhoneNumber = evt.target.PhoneNumber
        ? evt.target.PhoneNumber.value
        : null
      const ccNumber = evt.target.ccNumber ? evt.target.ccNumber.value : null
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(
        auth(
          firstName,
          lastName,
          shippingAddress,
          billingAddress,
          PhoneNumber,
          ccNumber,
          email,
          password,
          formName
        )
      )
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
