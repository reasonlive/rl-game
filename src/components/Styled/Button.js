import React, {Fragment} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';
const Button = ({text,size,status,action,font}) =>{

	let w,h;

	switch(size){
		case 'small': w = '70px';h = '30px';break;
		case 'medium': w = '100px';h = '30px';break;
		case 'large': w = '150px';h = '50px';break;
		default: w = 0;h = 0;
	}

	const StyledButton = styled.button`
	background-color:${styles.itemColors[status]};
	font: ${styles.fonts[font][size]};
	color:white;
	width:${w};
	height:${h};
	border:0;outline:0;
	border-radius:5px;
	padding:5px;
	cursor:pointer;
	&:hover{
		color: black;
		background-color:orange;
		border: 1px solid black;
		
	}

	`


	return (
		<Fragment>
			<StyledButton onClick={action}>{text}</StyledButton>
		</Fragment>
	)

}

export default Button;