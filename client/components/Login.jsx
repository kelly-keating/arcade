import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {loginUser, loginError} from '../actions/login'


class Login extends React.Component {
  state = {
    user_name: '',
    password: ''
  }

  componentDidMount = () => {
    this.props.dispatch(loginError(''))
  }

  updateDetails = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submit = (e) => {
    e.preventDefault()
    let {user_name, password} = this.state
    this.props.dispatch(loginUser({user_name, password}))
  }

  render = () => {
    const {auth} = this.props
    return (
      <form className="center-form form box" onSubmit={this.submit}>
        <h1 className="title is-2">Login</h1>
        <Link to='/register'>or register a new user</Link>
        <hr />
        {auth.errorMessage && <span className="has-text-danger is-large">{auth.errorMessage}</span>}
        <div className="form-row">  
          <label className="label is-large has-text-centered" htmlFor="user_name">Username</label>
          <input required className="input has-text-centered is-large is-fullwidth" placeholder="Username" type="text" name="user_name" onChange={this.updateDetails}/>
        </div>
        <div className="form-row">  
          <label className="label is-large has-text-centered" htmlFor="password">Password</label>
          <input required className="input has-text-centered is-large is-fullwidth" placeholder="Password" type="password" name="password" onChange={this.updateDetails}/>
        </div>
        <input className="button is-large is-fullwidth is-success" value='Login' type="submit" />
      </form>
    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Login)
