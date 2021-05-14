
import React from 'react';
// import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
//import Home from './components/Home/Home';
import './styles/basic.css'

import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
       <div className="App">
        {/* <Header/> importing header in App.js */}
        <div className="container d-flex align-items-center flex-column">
            <Switch>
              <Route path="/" exact={true}>
                <RegistrationForm/>
              </Route>
            </Switch>
        </div>
      </div>
    </Router>
   
  )
}



export default App;
