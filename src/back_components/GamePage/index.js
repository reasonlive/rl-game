import React from 'react';

import CardTable from '../CardTable';
import GameOpponent from '../GameOpponent';
import UserHand from '../UserHand';
import GameProcessTable from '../GameProcessTable';
import Timer from '../Timer';

const GamePage = () => {
	return (
		<div>
			<CardTable
			css={{margin: '20px 0 0 20px'}}
			/>
			
			<GameOpponent 
			css={{position:'absolute',left:300,top:100}}
			/>
			<UserHand 
			css={{position:'absolute',left:400,bottom:-100}}
			/>
			<GameProcessTable 
			css={{position:'absolute',right:0,top:159}}

			/>

			<Timer 
			css={{position:'absolute',left:150,top:60}}
			/>
		</div>
	)
}

export default GamePage;