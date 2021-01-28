import React,{Fragment} from 'react';
import styled from 'styled-components';
import * as styles from '../../utils/styles';

const SIZE_X = 73;
const SIZE_Y = 98;

const StyledTimer = styled.div`
position:relative;
z-index:300;
width:200px;
height:40px;
background-color: ${styles.bgColors['toxic']};
font: ${styles.fonts['game']['medium_l']};
border-radius:10px;

overflow:hidden;
&:hover{
	transform:scale(0.8);
	transition: all 0.5s;
	cursor:pointer;
}
`




const Timer = ({value,css,action}) => {



	return (
		<div style={css}>
			<StyledTimer onClick={action}>
				{value}
			</StyledTimer>
		</div>
	)
}

export default Timer; 
