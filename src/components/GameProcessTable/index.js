import React,{Fragment} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';


const StyledTable = styled.div`
position:relative;
width:330px;
height:300px;
border-radius:10px;
background:rgba(0,0,0,0.8);
color:white;

`

const StoryBlock = styled.div`

position:absolute;
width:90%;height:80%;
background-color:${styles.bgColors['secondary']};
left:15px;
overflow:auto;
`

const StoryLine = styled.div`
width:97%;

background-color:khaki;
display:flex;
justify-content:space-between;
margin:5px 0 0 5px;
& div{
	display:inline-block;
	
	color:black;
}

`



const GameProcessTable = ({data,css,steps,title}) =>{

	//let gameProc = [{Set:'1',N:'1',name:'name',step:'10spades'}];

	let spades = (<span>&spades;</span>),
	clubs = (<span>&clubs;</span>),
	hearts = (<span>&hearts;</span>),
	diams = (<span>&diams;</span>);

	function setCardSymbol(step){

		let suit = step.split('/')[1];
		
		switch(suit){
			case 'spades': return spades;
			case 'clubs': return clubs;
			case 'hearts': return hearts;
			case 'diams':return diams; //this name need to change
			default: return '';
		}
	}



	let lines = Array.isArray(steps) ? steps.map((elem,ind)=> (
		<StoryLine key={ind}>
		<div>Set: {elem.gameSet}</div>
		<div>N: {elem.currentStep}</div>
		<div>name: {elem.name}</div>
		<div>Step: {elem.step} {elem.step && setCardSymbol(elem.step)}</div>
		</StoryLine>
	)) : [];

	return(
		<div style={css}>
			<StyledTable>
				<div>game has started at:{title ? title.startDate : ''}</div>
				<div>players:{title ? title.players : ''}</div>
				<StoryBlock>
					{lines}
				</StoryBlock>
			</StyledTable>
		</div>
	)
}

export default GameProcessTable;