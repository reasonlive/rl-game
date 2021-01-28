import React,{Fragment} from 'react';

//pages
import PageError from '../PageError';
import App from '../../App';
import MainPage from '../MainPage';
import Registration from '../Registration';
import Login from '../Login';
import GamePage from '../GamePage';
import Offerground from '../OffergroundPage';

import {store,sagaMiddleWare} from '../../store';
import {Provider} from 'react-redux';

import {
  getCheckAuth,
  renderOfferground
  
} from '../../store/sagas';

import {
  createBrowserRouter,
  HttpError,
  makeRouteConfig,
  Redirect,
  Route,
} from 'found';


sagaMiddleWare.run(getCheckAuth);

const fetchSession = async () => {
  return {logged: store.getState().info.logged}
}





const Router = createBrowserRouter({
  routeConfig: makeRouteConfig(

    <Route path="/"  getData={fetchSession} Component={App}>

    <Route Component={MainPage} />
    
    <Route path='registration' Component={Registration} />
    <Route path='login' Component={Login} />
    

    
    <Route 
    path='game' 
    Component={GamePage}
    
    />

     

    <Redirect from='logout' to="/" />
    <Route path='offerground'  Component={Offerground} />
    
    
    </Route>


  ),
 
  renderError: ({ error }) => (
    <Fragment>
    <App />
    <PageError error={error.status}/>
    </Fragment>
    
  ),
});

export default Router;