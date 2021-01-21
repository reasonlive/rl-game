import React from 'react';
import styled from 'styled-components';
import deck from './deck.png';
import Card from '../Card';
import {connect} from 'react-redux';

const StyledCardDeck = styled.div`
position:relative;
z-index:400;
width:126px;
height:198px;
background-image: url(${deck});
background-repeat:no-repeat;
background-size: auto;
&:hover{
	outline:2px solid orange;
	cursor:pointer;
}

`

//set the first card in the deck as a trump card
function setTrump(state){
	return{
		deck: state.info.proc && state.info.proc.getDeck()
	}
}



const CardDeck = ({position,action,deck}) => {

	let trumpShowed = deck ? 'block' : 'none';



	const handleClick = (e) =>{
		e.target.style.backgroundImage = '';
		alert('this is a carddeck');
	}

	return (
		<div style={position}>
			<StyledCardDeck data-cards={deck ? deck.length : 0} 
			onClick={action}
			onContextMenu={function(e){console.log(e.target.dataset.cards)}}

			/>
			<Card 
			suit={deck && deck[0] ? deck[0].suit : null} 
			rank={deck && deck[0] ? deck[0].rank : null} 
			trump={true} 
			css={{marginTop:-230, display: trumpShowed}}
			/>

		</div>
	)
}

export default connect(setTrump,undefined)(CardDeck);
//export default CardDeck;