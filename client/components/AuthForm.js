import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { FormControl, InputLabel, Button, Box, TextField, CustomInput, formGroupClasses, Input, Label } from '@mui/material';
import '../../public/Forms.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props


  return (
    <div className="Form-Container">
      <form className="Login-Form" onSubmit={handleSubmit} name={name}>
        <TextField label="username" name="username" variant="filled" required />
        <TextField label="Password" name="password" variant="filled" type="password" required />
        <Button variant="contained" type="submit" color="primary">
        {displayName}
        </Button>
      </form>
    </div>
  )
}

const SignUpForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="Form-Container">
      <form className="Signup-Form" onSubmit={handleSubmit} name={name}>
        <div>
          <InputLabel htmlFor="username">
            Username
          </InputLabel>
          <Input name="username" type="text" required />
        </div>
        <div>
          <InputLabel htmlFor="password">
            <small>Password</small>
          </InputLabel>
          <Input name="password" type="password" required />
        </div>
        <div>
          <InputLabel htmlFor="email">
            Email
          </InputLabel>
          <Input name="email" type="text" required />
        </div>
        <div>
          <InputLabel htmlFor="firstName">
            First Name
          </InputLabel>
          <Input name="firstName" type="text" required />
        </div>
        <div>
          <InputLabel htmlFor="lastName">
            Last Name
          </InputLabel>
          <Input name="lastName" type="text" required />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">{displayName}</Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
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
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()

      const method =  evt.target.name;

      let formData = {
        username: evt.target.username.value,
        password: evt.target.password.value,
      };

      if (method === 'signup') {
        formData = {
          ...formData,
          email: evt.target.email.value,
          firstName: evt.target.firstName.value,
          lastName: evt.target.lastName.value
        };
      }

      dispatch(authenticate(formData, method))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(SignUpForm)
