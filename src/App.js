import React from 'react';
import DefaultStyles from './utils/styles/default';
import Header from './components/Header';
import Footer from './components/Footer';

//for auto update logged state
import {Provider} from 'react-redux';
import {store} from './store';

function App({children,data}) {
  return (

    <Provider store={store} >
    <div style={{textAlign:'center'}} className='app'>
      <DefaultStyles />
      <Header
       bgcolor='awesome' 
       title={{
        text: 'rl-game',
        font: 'game',
        size: 'large_l'
       }}
       
       />
      {children}
    </div>
    </Provider>
  );
}

export default App;
