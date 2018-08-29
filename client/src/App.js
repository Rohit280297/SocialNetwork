import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import {Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authAction';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import SignUp from './components/SignUp/SignUp';
import Login from './components/LogIn/Login';
import Footer from './components/Layout/Footer';
import store from './store/store';

if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  // Set current user
  store.dispatch(setCurrentUser(decoded));
}
class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>
              <div className="App">
                  <Navbar/>
                  <Route exact path="/" component={Landing}/>
                  <div className="container">
                    <Route exact path="/register" component={SignUp}/>
                    <Route exact path="/login" component={Login}/>
                  </div>
                  <Footer/>
              </div>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
