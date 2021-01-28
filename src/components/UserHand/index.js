import React,{Fragment} from 'react';
import styled from 'styled-components';


import Card from '../Card';
import hand from './hand2.png';

const StyledHand = styled.div`
position:absolute;
bottom:0;left:10%;
width:230px;
height:230px;
margin-bottom:-30px;
margin-left:0px;
background-image: url(${hand});
background-repeat:no-repeat;
background-size:230px 230px;

`

const StyledUserHand = styled.div`
position:relative;
width:300px;
height:220px;


`

const CardBlock = styled.div`
position:relative;
z-index:100;
display:flex;
justify-content:center;
`

const UserHand = ({cards,css,action}) =>{

	let items = cards && cards.length > 0 ? cards.map((item,ind) => (
		<Card key={ind} rank={item.rank} suit={item.suit} trump={item.trump}/>
		)
		
	) : [];



	return(
		<div style={css}>
		<StyledUserHand>
			<CardBlock onClick={action}>
				{items}
			</CardBlock>
			<StyledHand/>
		</StyledUserHand>
			
		</div>
	)
}

export default UserHand;
