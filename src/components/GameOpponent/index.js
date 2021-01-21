import React from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';
import avatar from './avatar.png'
import card from './card.png';

const StyledOpponent = styled.div`
position:absolute;
width:400px;
height:130px;
border-radius:50%;
background-color:rgba(0,100,0,0.4);


`

const OpponentInfo = styled.div`
display:flex;
justify-content:center;
& img{
	
}

`

const Card = styled.div`
background-image:url(${card});
background-repeat:no-repeat;
background-size: 30px 50px;
margin-top:20px;
margin-right:-15px;
width:30px;
height:50px;


`
const CardBox = styled.div`
display:flex;
justify-content:center;

`

const GameOpponent = ({userData,css,exist,action}) => {


	//animation will change opacity of opponent cards
	//when his turn to come
	

	return (
		<div style={css}>
			<StyledOpponent>
		{exist ? (
			<div>
				<OpponentInfo>
					<img src={avatar} alt='name' width='50' height='50' />
					<div style={{font:styles.fonts['primary']['small_l']}}>
						<div>name:{userData.name}</div>
						<div>wins:{userData.wins}</div>
						<div>losses:{userData.losses}</div>
					</div>
				</OpponentInfo>
				<CardBox onContextMenu={action}>
				<Card style={{transform:'rotate(20deg)'}}/>
				<Card style={{transform:'rotate(15deg)'}}/>
				<Card style={{transform:'rotate(10deg)'}}/>
				<Card style={{transform:'rotate(-10deg)'}}/>
				<Card style={{transform:'rotate(-15deg)'}}/>
				<Card style={{transform:'rotate(-20deg)'}}/>
				</CardBox>
			</div> ) : ''}
			</StyledOpponent>

		</div>
	)
}

export default GameOpponent;