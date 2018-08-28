import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import {Provider } from 'react-redux';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import SignUp from './components/SignUp/SignUp';
import Login from './components/LogIn/Login';
import Footer from './components/Layout/Footer';
import store from './store';
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
