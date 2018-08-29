import { GET_ERRORS , SET_CURRENT_USER } from "./types";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData,history) =>dispatch=> {

   axios.post('/api/users/register',userData)
   .then(res=>{
            console.log("Result",res.data);
            history.push('/login');
        })
    .catch(e=>
            dispatch({
                type:GET_ERRORS,
                payload:e.response.data
            })
        );
};

export const loginUser = userData => dispatch => {
    axios.post('api/users/login',userData)
    .then(res=>{
        // save to local storage
        const {token} = res.data;
    
        localStorage.setItem('jwtToken',token);

        setAuthToken(token);

        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded));

    }).catch(e=>{
        console.log("Error in catch",e)
        dispatch({
            type:GET_ERRORS,
            payload:e.response.data
        })
    }
    );
};

export const setCurrentUser = decoded =>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = () => dispatch =>{
    // Remove token from localStorage
    
    localStorage.removeItem('jwtToken');

    // Remove token from future requests

    setAuthToken(false);

    dispatch(setCurrentUser({}));
}
