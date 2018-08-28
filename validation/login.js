const Validator = require('validator');
const isEmpty = require('./IsEmpty');
const validateLoginInputs = (data) =>{
    let errors = {}

    if(Validator.isEmpty(data.email)){
        errors.email = "Email is Required";
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Invalid Email";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password is required";
    }

    return{
        errors,
        isValid : isEmpty(errors)
    }
}

module.exports = validateLoginInputs;