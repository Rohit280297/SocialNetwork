import React, { Component } from 'react';
import './SignUp.css';
import {connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {registerUser} from '../../actions/authAction';
class SignUp extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        }
    }

    onChangeHandler = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmitHandler=(e)=>{
        e.preventDefault();

        const newuser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2,
        }
        this.props.registerUser(newuser,this.props.history);
    }

    componentWillReceiveProps = nextProps =>{
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }
  render() {
       const {errors} = this.state;
    return (
    <div className="SignUp">
        <div className="container">
        
            <h2>Sign Up</h2>
            <h4>Create your DevConnector Account</h4>
            <form className="signUpForm" onSubmit={(event)=>this.onSubmitHandler(event)}>
                <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={(event)=>this.onChangeHandler(event)}/>    
                <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={(event)=>this.onChangeHandler(event)}/>
                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={(event)=>this.onChangeHandler(event)}/>
                <input type="password" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={(event)=>this.onChangeHandler(event)}/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    </div>
    )
  }
}

SignUp.propTypes = {
    registerUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    auth:state.auth,
    errors:state.errors
})

export default connect(mapStateToProps,{registerUser})(withRouter(SignUp));
