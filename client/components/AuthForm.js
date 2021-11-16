import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { Button, Box, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import '../../public/Forms.css'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props


  return (
      <Box
        component="form"
        className="Form-Container"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit} name={name}
      >
        <TextField id="outlined-basic" label="Username" type="username" name="username" />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            {displayName}
          </Button>

          <Button component={Link} to="/signup"
          variant="contained" color="primary" sx={{
            marginLeft: 6.5
          }}>
            Sign Up
          </Button>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </Box>

  )
}

const SignUpForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="Form-Container">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit} name={name}
      >
        <div className="row">
          <div className="column">
            <TextField label="Username" type="username" name="username" />
            <TextField label="Email" type="email" name="email" />
          </div>
          <div className="column">
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                name="password"
              />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <TextField label="First Name" type="text" name="firstName" />
          </div>
          <div className="column">
            <TextField label="Last Name" type="textg" name="lastName" />
          </div>
        </div>
        <Button type="submit" variant="contained" color="primary">{displayName}</Button>

        {error && error.response && <div> {error.response.data} </div>}
      </Box>
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
