import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Signup from './components/registration/signup/Signup'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Hello its me shyma </h1>
        <Link to='/api/user/signup'>signup</Link>
          <Switch>
            <Route exact path = '/api/user/signup' component={Signup}></Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
