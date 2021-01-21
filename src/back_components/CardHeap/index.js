import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import deck from './deck.png';

const StyledCardHeap = styled.div`
position:absolute;
right:20px;top:200px;
width:20px;
height:20px;
background-size: auto;
&:hover{
	cursor:pointer;
	
}


`

const CardHeap = ({position}) => {

	let [heap,renderHeap] = useState([]);

	let cardcss = {
		position:'absolute',
		right:10,

	}

	const createheap = () => {
		
		let heapState = [];
		for(let i=0;i<10;i++){
			let index = Math.random();
			index = index.toFixed(1);
			heapState.push({order:i,css: {...cardcss,transform:'rotate(' +index + 'turn)'}});
		}
		renderHeap(heapState);
	}

	useEffect(()=>{
		createheap()
	},[])



	heap = heap.map(elem=> (<img style={elem.css} key={elem.order} src={deck} alt='card' width='40px' height='70px' />) )

	return (
		<div style={position}>
			<StyledCardHeap onClick={createheap}>
			{heap}
			</StyledCardHeap>
		</div>
	)
}

export default CardHeap;