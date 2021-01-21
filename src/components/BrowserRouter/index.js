import React,{Fragment} from 'react';
import produce from "immer";

import Tests from '../../Tests';
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
  renderCreatedGames,
  renderFinishedGames
  
} from '../../store/sagas';

import {
  createBrowserRouter,
  HttpError,
  makeRouteConfig,
  Redirect,
  Route,
} from 'found';

const fetchSession = async () => {
  return {logged: store.getState().logged}
}



const fetchGames = async () => {
  
  sagaMiddleWare.run(renderCreatedGames);
  sagaMiddleWare.run(renderFinishedGames);
  console.log(store.getState())
  return {
    offers: store.getState().offers,
    games: store.getState().games
  }
}

const checkGameTable = (id)=>{

}



const Router = createBrowserRouter({
  routeConfig: makeRouteConfig(

    <Route path="/"  getData={fetchSession} Component={App}>

    <Route Component={MainPage} />
    
    <Route path='registration' Component={Registration} />
    <Route path='login' Component={Login} />
    

    
    <Route 
    path='game/open/:id' 
    Component={GamePage} 
    />

     

    <Redirect from='logout' to="/" />
    <Route path='offerground' getData={fetchGames}  Component={Offerground} />
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