import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
import axios from 'axios';
class Login extends Component {

    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{}
        }
    }

    onChangeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.auth.isAuthenticated){
    //         this.props.history.push('/dashboard');
    //     }
    //     if(nextProps.errors){
    //         this.setState({errors:nextProps.errors})
    //     }
    // }

    onSubmitHandler= (e)=>{

        e.preventDefault();

        let loginDetails = {
            email:this.state.email,
            password:this.state.password
        }

        axios.post('/api/users/login',loginDetails).then(res=>console.log(res)).catch(err=>console.log(err));

        // this.props.loginUser(loginDetails);

    }
  render() {

    const {errors} = this.state;
    return (
        <div className="LogIn">
        <div className="container">
            <h2>Log in</h2>
            <h4>Welcome back Developer !</h4>
            <form className="LoginForm" onSubmit={(event)=>this.onSubmitHandler(event)}>  
                <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={(event)=>this.onChangeHandler(event)}/>
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={(event)=>this.onChangeHandler(event)}/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    </div>
    )
  }
}

// Login.propTypes = {
//     loginUser : PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object
// }



// const mapStateToProps = state =>({
//     auth:state.auth,
//     errors:state.errors
// })

export default Login;
