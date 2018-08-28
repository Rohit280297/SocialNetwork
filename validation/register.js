const Validator = require('validator');
const isEmpty = require('./IsEmpty');


const validateRegisterInput = (data) =>{

    let errors = {};

    data.name = !isEmpty(data.name) ? data.name: '' ;
    data.email = !isEmpty(data.email) ? data.email: '' ;
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ?data.password2: '' ;

    if(!Validator.isLength(data.name,{min:2,max:30})){
        errors.name = "Name must be between 2 and 30 characters";
        console.log('inside name length.');
    }

    if(Validator.isEmpty(data.name)){
        errors.name = "Name is required";
        console.log('inside name empty.');
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email is required";
        console.log('inside email empty.');
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password is required";
        console.log('inside password empty.');
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Comfirm Password is required";
        console.log('inside password2 empty.');
    }
    
    if(!Validator.equals(data.password,data.password2)){
        errors.password2 = "Passwords donot match";
        console.log('inside password comparision.');
    }

    if(!Validator.isLength(data.password,{min:6,max:20})){
        errors.password = "Password must be atleast 6 characters";
        console.log('inside password length.');
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


module.exports =  validateRegisterInput ;