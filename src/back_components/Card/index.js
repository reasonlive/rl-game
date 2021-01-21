import React from 'react';
import styled from 'styled-components';

import cards from './cards.png';

const SIZE_X = 73;
const SIZE_Y = 98;

const StyledCard = styled.div`

width:74px;
height:97px;
overflow:hidden;
&:hover{
	transform:scale(0.8);
	transition: all 0.5s;
	cursor:pointer;
}
`
//clubs
//spades
//hearts
//diamonds

const Card = ({rank,suit,css}) => {

	let posx = 0, posy = 0;

	switch(rank){
		case 'A': break;
		case '2': posx = posx - SIZE_X;break;
		case '3': posx = posx - SIZE_X*2;break;
		case '4': posx = posx - SIZE_X*3;break;
		case '5': posx = posx - SIZE_X*4;break;
		case '6': posx = posx - SIZE_X*5;break;
		case '7': posx = posx - SIZE_X*6;break;
		case '8': posx = posx - SIZE_X*7;break;
		case '9': posx = posx - SIZE_X*8;break;
		case '10': posx = posx - SIZE_X*9;break;
		case 'J': posx = posx - SIZE_X*10;break;
		case 'Q': posx = posx - SIZE_X*11;break;
		case 'K': posx = posx - SIZE_X*12;break;
		default: posx = 0;
	}

	switch(suit){
		case 'clubs': break;
		case 'spades': posy = posy - SIZE_Y;break;
		case 'hearts': posy = posy - SIZE_Y*2;break;
		case 'diamonds': posy = posy - SIZE_Y*3;break;
		default: posy = 0;
	}


	


	let cardStyle = {
		backgroundColor:'black',
		backgroundImage: "url("+ cards +")",
		backgroundPosition: `${posx}px ${posy}px`,
		backgroundSize: 'auto',
		width:74,
		height:97,

		//transform:'rotate('+ turnDegree +')'

	}

	return (
		
			
		
		<StyledCard style={css}>
			
			<div style={cardStyle}></div>
			
		</StyledCard>
			
		
	)


}

export default Card;