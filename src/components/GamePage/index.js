import React from 'react';

import CardTable from '../CardTable';
import GameOpponent from '../GameOpponent';
import UserHand from '../UserHand';
import GameProcessTable from '../GameProcessTable';
import Timer from '../Timer';

import {store} from '../../store';
import {connect} from 'react-redux';


//import all the events 
import {act} from './handlers/act';
import {hold} from './handlers/hold';
import {pick} from './handlers/pick';

//import init function
import {initGame} from './handlers/init';



function changeableVars(state){
	return {
		ownerCards: state.cards.cards && state.cards.cards.player1 ,//? state.cards.player1 : [],
		oppCards: state.cards.cards && state.cards.cards.player2,// ? state.cards.player2 : [],
		userData: state.info.opponent,
		timerValue: state.timer.timerValue,
		history: state.info.history,
		activeCard: state.cards.activeCard,
		tableTitle:state.info.title,
	}
}



const GamePage = (

	{
		ownerCards,  //renders cards of pc owner
		oppCards, //renders opponent cards
		userData, //opponent info
		timerValue, //value of timer counter
		history, // history of player's steps
		activeCard, // the card on the table 
		tableTitle // game title , who plays and when it started
	}) => {


	

	//drop action for testing only
	/*const drop = ()=> {
		store.dispatch({type:'CARD_RENDER',activeCard:''});
	}*/

	

	//when you clicks by right button on opponent's cards
	function showCards(e){
		e.preventDefault();
		let cardblock = 
		window.document.getElementsByClassName('player2')[0];
		cardblock.style.display = 'block';
	}

	

	//renders opponents cards in singleMode
	let divs = localStorage.getItem('singleMode') ? oppCards && oppCards.map((item,ind)=> (<div key={ind}>
			<div
			style={{border:'1px solid black',cursor:'pointer',background:'orange'}}
			data-rank={item.rank}
			data-suit={item.suit}
			data-trump={item.trump}
			data-username={store.getState().info.proc.players[1].name}
			onClick={(e)=>{
				document.getElementsByClassName('player2')[0].style.display = 'none';
				act(e);
			} }
			>
			{item.rank}:{item.suit}
			</div></div>) ) : null;


	let cssMsg = {position:'absolute',
		top:-350,
		left:300,
		background:'rgba(0,0,0,0.8)',
		position:'relative',
		zIndex:300,
		color:'white',
		width:400,
		borderRadius:10,
		padding:20,

	}

	


	

	return (
		<div>
			
			<CardTable
			css={{margin: '20px 0 0 20px'}}
			activeCard={activeCard}
			activeCardAction={hold}
			deckAction={pick}
			//heapAction={drop}

			/>
			
			<GameOpponent 
			css={{position:'absolute',left:300,top:100}}
			userData={userData}
			exist={userData ? true : false}
			action={localStorage.getItem('singleMode') ? showCards : null}
			/>
			<UserHand
			action={act}
			css={{position:'absolute',left:400,bottom:-100}}
			cards={ownerCards}
			/>
			<GameProcessTable 
			css={{position:'absolute',right:0,top:159}}
			title={tableTitle}
			steps={history}
			/>

			<Timer 
			css={{position:'absolute',left:150,top:60}}
			value={timerValue || 'timer'}
			
			action={initGame}
			/>

			{localStorage.getItem('singleMode') ? (<div>
			<div className='player2' 
			style={
				{
					color:'black',
					display:'none',
					position:'absolute',
					width:300,height:100,
					background:'white',
					left:400,top:150,
					overflow:'auto'
				}}>
				{divs}
			</div>
			 <div className='msg' style={cssMsg}>You are now playing IN A SINGLE MODE, which means you have to make steps for both players
			and that is the way to test the application in UI details. To see the opponent's cards just click on the right button 
			by the opponent's cards place <br/><br/> To start the game click on the timer on left-top side</div></div>) : ''}
		</div>
	)
}

//export default GamePage;
export default connect(changeableVars,undefined)(GamePage);