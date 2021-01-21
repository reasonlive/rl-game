import React from 'react';
import styled from 'styled-components';
import deck from './deck.png';

const StyledCardDeck = styled.div`

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

const CardDeck = ({position}) => {



	const handleClick = (e) =>{
		e.target.style.backgroundImage = '';
		alert('this is a carddeck');
	}

	return (
		<div style={position}>
			<StyledCardDeck onClick={handleClick}/>
		</div>
	)
}

export default CardDeck;