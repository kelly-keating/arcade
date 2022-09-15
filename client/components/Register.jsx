import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {registerUserRequest} from '../actions/register'
import {loginError} from '../actions/login'

function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class Register extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(loginError(''))
  }

  updateDetails = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submit = (e) => {
    e.preventDefault()
    let {password, confirm_password} = this.state
    if (confirm_password != password) return this.props.dispatch(loginError("Passwords don't match"))
    
    e.target.reset()
    this.props.dispatch(registerUserRequest(this.state)) 
  }



  render = () => {
    const {auth} = this.props
    return (
      <form className="center-form Register form box" onSubmit={this.submit}>
        <h1 className="title is-2">Register</h1>
        <Link to='/'>or login to an existing account</Link>
        <hr />
        {auth.errorMessage && <span className="has-text-danger is-large">{auth.errorMessage}</span>}

        <div className="form-row"> 
          <label className="column is-6 label is-large has-text-centered" htmlFor="actual_name">Full Name</label>
          <input required className="input is-large has-text-centered is-fullwidth" placeholder="Full Name" type="text" name="actual_name" onChange={this.updateDetails}/>
        </div>
        <div className="form-row"> 
          <label className="column is-6 is-offset-one-quarter label is-large has-text-centered" htmlFor="user_name">Username</label>
          <input required className="input is-large has-text-centered is-fullwidth" placeholder="Username" type="text" name="user_name" onChange={this.updateDetails}/>
        </div>
        <div className="form-row"> 
          <label className="column is-6 label is-large has-text-centered" htmlFor="password">Password</label>
          <input required className="input is-large has-text-centered is-fullwidth" placeholder="Password" type="password" name="password" onChange={this.updateDetails}/>
        </div>
        <div className="form-row"> 
          <label className="column is-6 label is-large has-text-centered" htmlFor="confirm_password">Confirm Password</label>
          <input required className="input is-large has-text-centered is-fullwidth" placeholder="Confirm Password" type="password" name="confirm_password" onChange={this.updateDetails}/>
        </div>
        
        <hr/>

        <input className="button is-success is-large is-fullwidth" value="Register" type="submit" />
      </form>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Register)
