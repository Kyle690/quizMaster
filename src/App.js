import React from 'react';
import history from './history';
import {Router, Route, Switch, Redirect}from 'react-router-dom';

// components
import Home from "./views/main/Home";
import Auth from './views/admin/auth';
import AdminMain from "./views/admin/home";


function App() {
  return (
    <Router history={history}>
        <Switch>
          <Route path={'/quiz:id'} exact component={Home} />
          <Route path={'/admin'} exact component={Auth}/>
          <Route path={'/admin/home'} component={AdminMain}/>
          <Redirect from={'/'} to={'/quiz:'}/>
        </Switch>
    </Router>
  );
}

export default App;
