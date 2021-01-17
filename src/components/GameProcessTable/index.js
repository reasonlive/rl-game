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



const GameProcessTable = ({processData,css}) =>{

	let gameProc = [{Set:'1',N:'1',name:'name',step:'10spades'}];



	let lines = gameProc.map(elem=> (
		<StoryLine>
		<div>Set: {elem.Set}</div>
		<div>N: {elem.N}</div>
		<div>name: {elem.name}</div>
		<div>Step: {elem.step}&spades;</div>
		</StoryLine>
	))

	return(
		<div style={css}>
			<StyledTable>
				<div>game has started at:</div>
				<div>players:</div>
				<StoryBlock>
					{lines}
				</StoryBlock>
			</StyledTable>
		</div>
	)
}

export default GameProcessTable;