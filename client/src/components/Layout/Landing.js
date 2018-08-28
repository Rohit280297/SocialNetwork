import React from 'react';
import './Landing.css';
import {Link} from 'react-router-dom';
const Landing = () => {
  return (
    <div className="Landing">
        <div className="dark-overlay">
            <h1>DevConnector : Where Developers Meet</h1>
            <h5>SignUp or Login to connect to the World of Developers</h5>
            <button className="SignUp_Button"><Link to="/register">SignUp</Link></button>
            <button className="Login_Button"><Link to="/login">Login</Link></button>
        </div>
    </div>
  )
}

export default Landing;
