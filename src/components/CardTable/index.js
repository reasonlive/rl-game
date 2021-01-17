import React,{Fragment} from 'react';
import styled from 'styled-components';
import table from './table.jpg';
import CardDeck from '../CardDeck';
import CardHeap from '../CardHeap';
import Card from '../Card';

const StyledTable = styled.div`
position:relative;
overflow:hidden;
width:1000px;
height:500px;
border-radius:100px;
background-image: url(${table});
background-size:auto;

`

const HitPlace = styled.div`
position:absolute;
left:50%;top:35%;
width:74px;height:97px;
border:2px solid black;

`


const CardTable = ({css}) =>{

	return(
		<div style={css}>
			<StyledTable>
				<CardDeck 
				position={{position:'absolute',top:149,left:10}}
				/>

				<HitPlace>
				</HitPlace>
				<CardHeap />
			</StyledTable>
		</div>
	)
}

export default CardTable;

