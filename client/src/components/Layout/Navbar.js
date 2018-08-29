import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';

class Navbar extends Component {

  onLogoutHandler(e){
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {

    const {isAuthenticated , user } = this.props.auth;

    const authLinks = (
      <ul>
          <li><a onClick = {this.onLogoutHandler.bind(this)} href="#">
          <img 
          src={user.avatar} 
          alt={user.name} style={{width: '25px' ,marginRight : '5px'}}
          className = 'rounded-circle'
          title="You must have a gravatar attached to your email."/></a> Logout</li>
      </ul> 
    );

    const guestLinks = (
      <ul>
          <li><Link to="/register">SignUp</Link></li>
          <li><Link to="/login">Login</Link></li>
      </ul> 
    );
    return (
      <div className="Navbar">
         <div className="container">
            <div className="ulLists">
                  <ul>
                      <li><Link to="/">DevConnector</Link></li>
                      <li><Link to="/">Developers</Link></li>
                  </ul>
                  {isAuthenticated ? authLinks : guestLinks}
            </div>
            </div>
      </div>
    )
  }
}
Navbar.propTypes ={
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state =>{
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps,{logoutUser})(Navbar);

