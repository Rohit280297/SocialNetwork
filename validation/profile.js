const Validator = require('validator');
const isEmpty = require('./IsEmpty');

const profileInputValidation = (data) =>{
    let errors = {};

    data.handle = isEmpty(data.handle) ? "" : data.handle;
    data.skills = isEmpty(data.skills) ? "" : data.skills;
    data.status = isEmpty(data.status) ? "" : data.status;

    if(Validator.isEmpty(data.handle)){
        errors.handle = "Profile Handle is a required field";
    }

    if(Validator.isEmpty(data.skills)){
        errors.skills = "Skills is a required field";
    }

    if(Validator.isEmpty(data.status)){
        errors.status = "Status is a required field";
    }

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = "Not a valid URL";
        }
    }

    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
            errors.youtube = "Not a valid URL";
        }
    }

    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = "Not a valid URL";
        }
    }

    if(!isEmpty(data.linkedIn)){
        if(!Validator.isURL(data.linkedIn)){
            errors.linkedIn = "Not a valid URL";
        }
    }

    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = "Not a valid URL";
        }
    }

    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = "Not a valid URL";
        }
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}

module.exports = profileInputValidation;