import React,{Fragment} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';
import background from './bg1.jpg';


const StyledMainPage = styled.div`

background-image:url(${background});
background-repeat:no-repeat;
margin-left:10px;
opacity:1;
background-size:auto;

height:530px;

`

const DescriptionBlock = styled.div`
position:absolute;
margin:50px;
border-radius:20px;
background-color:rgba(0,0,0,0.8);
color:white;
font: ${styles.fonts['official']['medium_l']};
text-align:center;

`

const MainPage = () => {

	function onSub(data){
		console.log(data)
	}


	return (

			<div>
				<DescriptionBlock>
				<big>Russian Durak </big> 
				is a traditional Russian card game that is popular 
				in many post-Soviet states. 
				It is Russia's most popular card game, having displaced Preferans.
				 It has since become known in other parts of the world.
				 The objective of the game is to shed all one's cards when there are
				  no more cards left in the deck. At the end of the game, the last
				   player with cards in their hand is the durak or 'fool'.
				 <hr/>
				 <div style={{fontSize:20}}>
				 	The game is typically played with two to five people,
				 	 with six players if desired, using a deck of 36 cards, 
				 	 for example a standard 52-card deck from which 
				 	 	the numerical cards 2 through 5 have been removed. 
			In theory the limit for a game with one deck of 36 cards is six players, 
			but this extends a considerable advantage to the player who attacks first, 
			and a considerable disadvantage to the player who defends first. 
			Variants exist that use more than one deck.

			The deck is shuffled, and each player is dealt six cards.
			 The bottom card of the stock is turned and placed face up on the table,
			  its suit determining the trump suit for the current deal.
			   For example, if it is the 7 of diamonds, then diamonds rank higher than all plain-suit 
			   cards. The rest of the pack is then placed on half over the turnup and at right angles
			    to it, so that it remains visible. These cards form the prikup or talon.
			     The turnup remains part of the talon and is drawn as the last card.
			      Cards discarded due to successful defences are placed in a discard pile next to
			       the talon.
				 </div>
				</DescriptionBlock>
				<StyledMainPage>
					
				</StyledMainPage>
			 </div>
			
		
	
	)
}

export default MainPage;