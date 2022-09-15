import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'
import Register from './Register'
import Pong from './Pong/Pong'

import {isAuthenticated} from '../utils/auth'
import {logoutUser} from '../actions/logout'


export function App({auth, logout}) {
  return (
    <Router>
      <div className="container has-text-centered">  
        <div className=''>
          {/* {!isAuthenticated() ? (
            <>
            <Route exact path="/" component={Login} />
            <Route path='/register' component={Register} />
            </>

          ) : (
            <> */}
            <h1>Welcome!</h1>
            {/* <button className="navbar-item" onClick={logout}>Logout</button> */}
            <Route path="/pong" component={Pong} />
            {/* </>
          )} */}
          
        </div>

      </div>
    </Router>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
