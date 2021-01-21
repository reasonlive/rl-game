import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import * as styles from '../../utils/styles';

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
background:rgba(0,0,0,1);
color:white;

`

const ItemList = styled.div`
width:95%;
min-height:30px;
background:white;
border-radius:10px;
margin:10px;
& div{
	display:inline-block;
	color:black;
	margin-right:20%;
}

`

const Offerground = ({data}) => {


	const takeOffer = () => {
		console.log('play button')
		window.document.location = '/game';
	}

	let offers = data && data.offers;
	let games = data && data.games;

	offers = offers && offers.map(elem=> (
		<ItemList data-id={elem.id}>
		<div>player:{elem.players[0]}</div>
		<div>created:{elem.startDate}</div>
		<Button 
		size='small'
		status='attention'
		text='play'
		/>
		</ItemList>
	) )

	games = games && games.map(elem=> (
		<ItemList data-id={elem.id}>
		<div>elem.username</div>
		<div>elem.created</div>
		</ItemList>
	) )





	return (
		<MainBlock>
			<OfferBlock>
			<div style={{font:styles.fonts['game']['medium_m']}}>Offer list table</div>
			<div style={{overflow:'auto',height:400}}>
				<ItemList>
					<div>
						username
					</div>
					<div>
						created date
					</div>
					<Button 
					size='small'
					status='attention'
					text='play'
					action={takeOffer}
					/>
				</ItemList>
			</div>	
			</OfferBlock>

			<StatisticBlock>
			<div style={{font:styles.fonts['game']['medium_m']}}>Common statistic table</div>
			</StatisticBlock>
		</MainBlock>
	)
}

export default Offerground;