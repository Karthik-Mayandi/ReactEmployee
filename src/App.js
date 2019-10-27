import React, { Component } from 'react';
import './App.css'
import List from './components/list';
import Forms from './components/form';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from './components/modal';

import Edit from './components/Update';
import Header from './components/Header'
 
class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Router>
 
<link href="https://fonts.googleapis.com/css?family=Nunito:400,800&display=swap" rel="stylesheet"></link>

        <Header/>
       
        <Route exact path = '/modal' component = { Modal } />

        </Router>
      </div>
    );
  }
}

export default App;
