import React, {Fragment,Component} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';




class Button extends Component

{

	constructor(props){
		super(props)
	}

	{text,size,status,action,font,submit}


	let w,h;

	switch(size){
		case 'small': w = '70px';h = '30px';break;
		case 'medium': w = '100px';h = '30px';break;
		case 'large': w = '150px';h = '50px';break;
		default: w = 0;h = 0;
	}

	const StyledButton = styled.button`
	background-color:${styles.itemColors[status]};
	font: ${font};
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
	}

	`


	return (
		<Fragment>
			<StyledButton 
			onClick={action}
			type={submit ? 'submit' : 'button'}
			>

			{text}
			</StyledButton>
		</Fragment>
	)

}

export default Button;