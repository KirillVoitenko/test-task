import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Authorization } from './components/sign/authorization/authorization';
import { Loader } from './components/general/loader/loader';
import { Registration } from './components/sign/registration/registration';
import { HomePage } from './components/homePage/homePage';

const App: React.FC = () => {
   return (
      <Router>
         <div className="App">
            <Loader>
               <Redirect to='/authorization' />
               <Switch>
                  <Route
                     path='/authorization'
                     exact
                     render={() => <Authorization />}
                  />
                  <Route
                     path='/registration'
                     exact
                     render={() => <Registration />}
                  />
                  <Route
                     path='/home'
                     exact
                     render={() => <HomePage />}
                  />
               </Switch>
            </Loader>
         </div>
      </Router>
   );
}

export default App;
