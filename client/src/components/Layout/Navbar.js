import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';
export default class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
         <div className="container">
            <div className="ulLists">
                  <ul>
                      <li><Link to="/">DevConnector</Link></li>
                      <li><Link to="/">Developers</Link></li>
                  </ul>
                  <ul>
                      <li><Link to="/register">SignUp</Link></li>
                      <li><Link to="/login">Login</Link></li>
                  </ul>
            </div>
            </div>
      </div>
    )
  }
}

