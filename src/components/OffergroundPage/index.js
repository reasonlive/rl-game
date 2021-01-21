import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import * as styles from '../../utils/styles';

import {store} from '../../store';
//import {addToOffers} from '../../store/sagas';
import {connect} from 'react-redux';

import clientFetcher from '../../utils/fetcher';
const fetcher = new clientFetcher();


async function addGameToOffers(){

	let gameId = await fetcher.sendForCreatingGame({
		startDate: new Date(),
		finished:false
	})

	

	/*let gameData = {id: 'ldjljdsf',
		startDate: '233434',
		finished:false,
		players: [
		name,
		],
	}*/

	//store.dispatch({type:'CREATE_OFFER',offer:gameData});

	//sagaMiddleWare.run(addToOffers,name);
	window.document.location = '/game/'+gameId;
}



function changableVars(state){
	return {
		games: state.games,
		offers: state.offers
	}
}

const MainBlock = styled.div`
display:grid;
grid-template-columns: repeat(2,1fr);
height:530px;
`

const OfferBlock = styled.div`
background:rgba(0,0,0,0.8);
color:white;
height:100%;
border-right:2px solid orange;
`

const StatisticBlock = styled.div`
position:relative;
background:rgba(0,0,0,1);
color:white;


`

const ItemList = styled.div`
position:relative;
width:95%;
min-height:30px;
background:white;
border-radius:10px;
margin:10px;
color:black;
& div{
	display:inline-block;
	color:black;
	border:1px solid black;
	margin:10px;
	
}

`

const CreateOfferItem = styled.div`
width:95%;
background:white;
color:black;
border-radius:10px;
margin:15px;

font: ${styles.fonts['primary']['medium_m']};

& div{
	margin: 20px auto 20px auto;

}


`




const Offerground = ({data,games,offers}) => {
/*
	let data = {};
	data.offers = [{id:'3343434',players: ['user1'], startDate: new Date()}];*/


	

	//let offers = data && data.offers;
	//let games = data && data.games;

	offers = offers ? offers.map((elem,ind)=> (
		<ItemList key={ind}>
		<div>player:{elem.players[0]}</div>
		<div>created:{elem.startDate}</div>
		<Button 
		size='medium'
		status='attention'
		text='play'
		action={()=> window.document.location = '/game/'+elem.id}
		/>
		</ItemList>
	) ) : [];

	games = games ? games.map((elem,ind)=> (
		<ItemList key={ind}>
		<div>started:{elem.startDate}</div>
		<div>ended:{elem.endDate}</div>
		
		<div>duration:{elem.duration}</div>
		<div>players: {elem.players[0]} , {elem.players[1]}</div>
		<div>winner:{elem.winner}</div>
		</ItemList>
	) ) : [];





	return (
		<MainBlock>
			<OfferBlock>
			<div style={{font:styles.fonts['game']['medium_m']}}>Offer list table</div>
			<CreateOfferItem>
				<div>You may create your own game or just take offer from the list below</div>

				<div style={{width:'80%',color:'red',font:styles.fonts['primary']['small_l']}}>
				After you get on the game page any redirection from there will close your game offer
				</div>
				<Button
				text='create'
				size='large'
				font={styles.fonts['game']['medium_s']}
				status='attention'
				action={()=>addGameToOffers()}
				/>
			</CreateOfferItem>
			<div style={{overflow:'auto',height:400,font:styles.fonts['primary']['medium_s']}}>
				{offers.length > 0 ? offers : 'empty'}
			</div>	
			</OfferBlock>

			<StatisticBlock>
			<div style={{font:styles.fonts['game']['medium_m']}}>Common statistic table</div>

			<div style={{overflow:'auto',height:500,font:styles.fonts['primary']['medium_s']}}>
				{games.length > 0 ? games : 'empty'}
			</div>
			</StatisticBlock>
		</MainBlock>
	)
}

//export default Offerground;
export default connect(changableVars,undefined)(Offerground);