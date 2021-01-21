import React,{Fragment} from 'react';


import Tests from '../../Tests';
import PageError from '../PageError';
import App from '../../App';
import MainPage from '../MainPage';
import Registration from '../Registration';
import Login from '../Login';
import GamePage from '../GamePage';
import Offerground from '../OffergroundPage';

import {store} from '../../store';
import {renderCreatedGame} from '../../store/sagas';


import {
  createBrowserRouter,
  HttpError,
  makeRouteConfig,
  Redirect,
  Route,
} from 'found';



/*const fetchOffers = async () => {
  renderCreatedGame();
  await new Promise(res => setTimeout(res,200))
  console.log(store.getState())
  return {offers: store.getState().offers}
}*/


const Router = createBrowserRouter({
  routeConfig: makeRouteConfig(

    <Route path="/"  Component={App}>

    <Route Component={MainPage} />
    
    <Route path='registration' Component={Registration} />
    <Route path='login' Component={Login} />
    
    <Route path='game' Component={GamePage} />
    <Redirect from='logout' to="/" />
    <Route path='offerground' getState={renderCreatedGame} Component={Offerground} />
    <Route path="tests" Component={Tests} />
    
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